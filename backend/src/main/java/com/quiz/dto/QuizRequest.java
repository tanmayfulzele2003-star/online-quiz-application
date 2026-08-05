package com.quiz.dto;

import com.quiz.model.Quiz;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record QuizRequest(
        @NotBlank String title,
        String description,
        @PositiveOrZero int timeLimit,
        @PositiveOrZero int totalMarks
) {
    public Quiz toEntity() {
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setDescription(description);
        quiz.setTimeLimit(timeLimit);
        quiz.setTotalMarks(totalMarks);
        return quiz;
    }
}
