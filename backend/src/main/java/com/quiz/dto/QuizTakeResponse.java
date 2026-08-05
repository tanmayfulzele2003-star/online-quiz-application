package com.quiz.dto;

import java.util.List;

/** Participant view of a quiz to take — questions via QuestionPublicDto (no correctAnswer). */
public record QuizTakeResponse(
        QuizDto quiz,
        List<QuestionPublicDto> questions
) {
}
