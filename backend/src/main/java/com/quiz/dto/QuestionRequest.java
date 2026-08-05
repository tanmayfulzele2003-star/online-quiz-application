package com.quiz.dto;

import com.quiz.model.Question;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public record QuestionRequest(
        @NotBlank String questionText,
        @NotBlank String optionA,
        @NotBlank String optionB,
        @NotBlank String optionC,
        @NotBlank String optionD,
        @NotBlank @Pattern(regexp = "A|B|C|D") String correctAnswer,
        @PositiveOrZero int marks
) {
    public Question toEntity() {
        Question question = new Question();
        question.setQuestionText(questionText);
        question.setOptionA(optionA);
        question.setOptionB(optionB);
        question.setOptionC(optionC);
        question.setOptionD(optionD);
        question.setCorrectAnswer(correctAnswer);
        question.setMarks(marks);
        return question;
    }
}
