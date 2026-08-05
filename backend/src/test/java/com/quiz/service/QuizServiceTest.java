package com.quiz.service;

import com.quiz.model.Quiz;
import com.quiz.repository.QuizRepository;
import com.quiz.repository.ResultRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private ResultRepository resultRepository;

    @InjectMocks
    private QuizService quizService;

    private Quiz sampleQuiz;

    @BeforeEach
    void setUp() {
        sampleQuiz = new Quiz("Java Basics", "Test Java knowledge", 15, 50);
        sampleQuiz.setId(1L);
    }

    @Test
    void testGetAllQuizzes() {
        when(quizRepository.findAll()).thenReturn(Arrays.asList(sampleQuiz));
        List<Quiz> quizzes = quizService.getAllQuizzes();
        assertEquals(1, quizzes.size());
        assertEquals("Java Basics", quizzes.get(0).getTitle());
    }

    @Test
    void testGetQuizById() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(sampleQuiz));
        Optional<Quiz> result = quizService.getQuizById(1L);
        assertTrue(result.isPresent());
        assertEquals("Java Basics", result.get().getTitle());
    }

    @Test
    void testSaveQuiz() {
        when(quizRepository.save(any(Quiz.class))).thenReturn(sampleQuiz);
        Quiz saved = quizService.saveQuiz(sampleQuiz);
        assertNotNull(saved);
        assertEquals("Java Basics", saved.getTitle());
        verify(quizRepository, times(1)).save(sampleQuiz);
    }

    @Test
    void testDeleteQuiz() {
        when(resultRepository.findByQuizId(1L)).thenReturn(Collections.emptyList());
        doNothing().when(quizRepository).deleteById(1L);
        quizService.deleteQuiz(1L);
        verify(resultRepository, times(1)).deleteAll(Collections.emptyList());
        verify(quizRepository, times(1)).deleteById(1L);
    }

    @Test
    void testUpdateQuiz() {
        Quiz updated = new Quiz("Updated Title", "Updated Desc", 20, 100);
        when(quizRepository.findById(1L)).thenReturn(Optional.of(sampleQuiz));
        when(quizRepository.save(any(Quiz.class))).thenReturn(sampleQuiz);

        Quiz result = quizService.updateQuiz(1L, updated);
        assertNotNull(result);
        verify(quizRepository).save(any(Quiz.class));
    }
}
