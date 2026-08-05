package com.quiz.controller;

import com.quiz.dto.*;
import com.quiz.model.Question;
import com.quiz.model.Quiz;
import com.quiz.service.QuestionService;
import com.quiz.service.QuizService;
import com.quiz.service.ResultService;
import com.quiz.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResultService resultService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return new AdminDashboardResponse(
                quizzes.size(),
                userService.getAllUsers().size(),
                quizzes.stream().map(QuizDto::from).toList()
        );
    }

    // Quiz Management
    @GetMapping("/quizzes")
    public List<QuizDto> listQuizzes() {
        return quizService.getAllQuizzes().stream().map(QuizDto::from).toList();
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<?> getQuiz(@PathVariable Long id) {
        return quizService.getQuizById(id)
                .<ResponseEntity<?>>map(quiz -> ResponseEntity.ok(QuizDto.from(quiz)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Quiz not found")));
    }

    @PostMapping("/quizzes")
    public ResponseEntity<QuizDto> addQuiz(@Valid @RequestBody QuizRequest request) {
        Quiz saved = quizService.saveQuiz(request.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(QuizDto.from(saved));
    }

    @PutMapping("/quizzes/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable Long id, @Valid @RequestBody QuizRequest request) {
        try {
            Quiz updated = quizService.updateQuiz(id, request.toEntity());
            return ResponseEntity.ok(QuizDto.from(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // Question Management
    @GetMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<?> manageQuestions(@PathVariable Long quizId) {
        return quizService.getQuizById(quizId)
                .<ResponseEntity<?>>map(quiz -> {
                    List<QuestionAdminDto> questions = questionService.getQuestionsByQuizId(quizId).stream()
                            .map(QuestionAdminDto::from).toList();
                    return ResponseEntity.ok(new QuizWithQuestionsResponse(QuizDto.from(quiz), questions));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Quiz not found")));
    }

    @PostMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<?> addQuestion(@PathVariable Long quizId, @Valid @RequestBody QuestionRequest request) {
        try {
            Question saved = questionService.addQuestion(quizId, request.toEntity());
            return ResponseEntity.status(HttpStatus.CREATED).body(QuestionAdminDto.from(saved));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .<ResponseEntity<?>>map(question -> ResponseEntity.ok(QuestionAdminDto.from(question)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Question not found")));
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @Valid @RequestBody QuestionRequest request) {
        try {
            Question updated = questionService.updateQuestion(id, request.toEntity());
            return ResponseEntity.ok(QuestionAdminDto.from(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id).orElse(null);
        if (question == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Question not found"));
        }
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // User Management
    @GetMapping("/users")
    public List<UserDto> userList() {
        return userService.getAllUsers().stream().map(UserDto::from).toList();
    }
}
