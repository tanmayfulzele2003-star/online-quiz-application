package com.quiz.service;

import com.quiz.model.*;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private EmailService emailService;

    public Result evaluateQuiz(User user, Quiz quiz, Map<Long, String> answers) {
        List<Question> questions = questionRepository.findByQuizId(quiz.getId());
        int score = 0;

        for (Question question : questions) {
            String userAnswer = answers.get(question.getId());
            if (userAnswer != null && userAnswer.equals(question.getCorrectAnswer())) {
                score += question.getMarks();
            }
        }

        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalMarks(quiz.getTotalMarks());
        result.setAttemptDate(LocalDateTime.now());

        Result savedResult = resultRepository.save(result);
        emailService.sendQuizCompletionEmail(user, quiz, savedResult);
        return savedResult;
    }

    public List<Result> getResultsByUser(Long userId) {
        return resultRepository.findByUserId(userId);
    }

    public List<Result> getResultsByQuiz(Long quizId) {
        return resultRepository.findByQuizId(quizId);
    }

    public List<Result> getUserQuizResults(Long userId, Long quizId) {
        return resultRepository.findByUserIdAndQuizId(userId, quizId);
    }
}
