package com.quiz.dto;

import java.util.List;

public record AdminDashboardResponse(
        int totalQuizzes,
        int totalUsers,
        List<QuizDto> quizzes
) {
}
