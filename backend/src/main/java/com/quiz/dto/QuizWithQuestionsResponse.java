package com.quiz.dto;

import java.util.List;

/** Admin view of a quiz's questions — includes correctAnswer via QuestionAdminDto. */
public record QuizWithQuestionsResponse(
        QuizDto quiz,
        List<QuestionAdminDto> questions
) {
}
