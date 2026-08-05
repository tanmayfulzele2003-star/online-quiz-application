package com.quiz.dto;

import com.quiz.model.Quiz;

public record QuizDto(
        Long id,
        String title,
        String description,
        int timeLimit,
        int totalMarks,
        int questionCount
) {
    public static QuizDto from(Quiz quiz) {
        int questionCount = quiz.getQuestions() == null ? 0 : quiz.getQuestions().size();
        return new QuizDto(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.getTimeLimit(),
                quiz.getTotalMarks(),
                questionCount
        );
    }
}
