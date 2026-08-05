package com.quiz.dto;

import com.quiz.model.Question;

public record QuestionAdminDto(
        Long id,
        String questionText,
        String optionA,
        String optionB,
        String optionC,
        String optionD,
        String correctAnswer,
        int marks,
        Long quizId
) {
    public static QuestionAdminDto from(Question question) {
        return new QuestionAdminDto(
                question.getId(),
                question.getQuestionText(),
                question.getOptionA(),
                question.getOptionB(),
                question.getOptionC(),
                question.getOptionD(),
                question.getCorrectAnswer(),
                question.getMarks(),
                question.getQuiz().getId()
        );
    }
}
