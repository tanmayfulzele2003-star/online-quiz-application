package com.quiz.dto;

import com.quiz.model.Question;

/** Participant-facing question view — deliberately omits correctAnswer. */
public record QuestionPublicDto(
        Long id,
        String questionText,
        String optionA,
        String optionB,
        String optionC,
        String optionD,
        int marks
) {
    public static QuestionPublicDto from(Question question) {
        return new QuestionPublicDto(
                question.getId(),
                question.getQuestionText(),
                question.getOptionA(),
                question.getOptionB(),
                question.getOptionC(),
                question.getOptionD(),
                question.getMarks()
        );
    }
}
