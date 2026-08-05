package com.quiz.dto;

import java.util.List;

public record ParticipantDashboardResponse(
        UserDto user,
        List<ResultDto> results,
        int totalQuizzes,
        int attemptCount
) {
}
