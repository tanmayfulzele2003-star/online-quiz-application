package com.quiz.service;

import com.quiz.model.User;
import com.quiz.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    @Test
    void testRegisterUser_Success() {
        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        User result = userService.registerUser("Test User", "test@test.com", "password123");

        assertNotNull(result);
        assertEquals("Test User", result.getFullName());
        assertEquals("test@test.com", result.getEmail());
        assertEquals("PARTICIPANT", result.getRole());
        verify(emailService).sendRegistrationEmail(any(User.class));
    }

    @Test
    void testRegisterUser_EmailExists() {
        when(userRepository.existsByEmail("existing@test.com")).thenReturn(true);

        assertThrows(RuntimeException.class, () -> {
            userService.registerUser("User", "existing@test.com", "password");
        });
    }

    @Test
    void testFindByEmail() {
        User user = new User("John", "john@test.com", "pass", "PARTICIPANT");
        when(userRepository.findByEmail("john@test.com")).thenReturn(Optional.of(user));

        User found = userService.findByEmail("john@test.com");
        assertNotNull(found);
        assertEquals("John", found.getFullName());
    }

    @Test
    void testFindByEmail_NotFound() {
        when(userRepository.findByEmail("nobody@test.com")).thenReturn(Optional.empty());
        User found = userService.findByEmail("nobody@test.com");
        assertNull(found);
    }
}
