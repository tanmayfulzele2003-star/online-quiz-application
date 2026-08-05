package com.quiz.controller;

import com.quiz.dto.*;
import com.quiz.model.*;
import com.quiz.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/participant")
public class ParticipantController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @Autowired
    private ResultService resultService;

    @GetMapping("/dashboard")
    public ParticipantDashboardResponse dashboard(Authentication auth) {
        User user = userService.findByEmail(auth.getName());
        List<Result> results = resultService.getResultsByUser(user.getId());
        return new ParticipantDashboardResponse(
                UserDto.from(user),
                results.stream().map(ResultDto::from).toList(),
                quizService.getAllQuizzes().size(),
                results.size()
        );
    }

    @GetMapping("/quizzes")
    public List<QuizDto> availableQuizzes() {
        return quizService.getAllQuizzes().stream().map(QuizDto::from).toList();
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<?> takeQuiz(@PathVariable Long id) {
        return quizService.getQuizById(id)
                .<ResponseEntity<?>>map(quiz -> {
                    List<QuestionPublicDto> questions = questionService.getQuestionsByQuizId(id).stream()
                            .map(QuestionPublicDto::from).toList();
                    return ResponseEntity.ok(new QuizTakeResponse(QuizDto.from(quiz), questions));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Quiz not found")));
    }

    @PostMapping("/quiz/{id}/submit")
    public ResponseEntity<?> submitQuiz(@PathVariable Long id,
                                         @RequestBody SubmitAnswersRequest request,
                                         Authentication auth) {
        User user = userService.findByEmail(auth.getName());
        return quizService.getQuizById(id)
                .<ResponseEntity<?>>map(quiz -> {
                    Result result = resultService.evaluateQuiz(user, quiz, request.answers());
                    return ResponseEntity.ok(ResultDto.from(result));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Quiz not found")));
    }

    @GetMapping("/results")
    public List<ResultDto> previousAttempts(Authentication auth) {
        User user = userService.findByEmail(auth.getName());
        return resultService.getResultsByUser(user.getId()).stream().map(ResultDto::from).toList();
    }

    @GetMapping("/profile")
    public UserDto profile(Authentication auth) {
        return UserDto.from(userService.findByEmail(auth.getName()));
    }

    @PutMapping("/profile")
    public UserDto updateProfile(@Valid @RequestBody ProfileUpdateRequest request, Authentication auth) {
        User user = userService.findByEmail(auth.getName());
        user.setFullName(request.fullName());
        userService.updateProfile(user);
        return UserDto.from(user);
    }
}
