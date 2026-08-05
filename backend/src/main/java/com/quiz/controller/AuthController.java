package com.quiz.controller;

import com.quiz.dto.AuthResponse;
import com.quiz.dto.LoginRequest;
import com.quiz.dto.RegisterRequest;
import com.quiz.model.User;
import com.quiz.security.JwtService;
import com.quiz.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (!request.password().equals(request.confirmPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Passwords do not match!"));
        }

        try {
            User user = userService.registerUser(request.fullName(), request.email(), request.password());
            String token = jwtService.generateToken(user.getEmail(), user.getRole(), user.getFullName());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(token, user.getFullName(), user.getEmail(), user.getRole()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password"));
        }

        User user = userService.findByEmail(request.email());
        String token = jwtService.generateToken(user.getEmail(), user.getRole(), user.getFullName());
        return ResponseEntity.ok(new AuthResponse(token, user.getFullName(), user.getEmail(), user.getRole()));
    }
}
