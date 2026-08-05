package com.quiz.dto;

import com.quiz.model.Result;

import java.time.LocalDateTime;

public record ResultDto(
        Long id,
        Long quizId,
        String quizTitle,
        int score,
        int totalMarks,
        LocalDateTime attemptDate
) {
    public static ResultDto from(Result result) {
        return new ResultDto(
                result.getId(),
                result.getQuiz().getId(),
                result.getQuiz().getTitle(),
                result.getScore(),
                result.getTotalMarks(),
                result.getAttemptDate()
        );
    }
}
