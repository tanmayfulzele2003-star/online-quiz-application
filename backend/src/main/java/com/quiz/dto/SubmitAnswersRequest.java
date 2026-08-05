package com.quiz.dto;

import java.util.Map;

public record SubmitAnswersRequest(
        Map<Long, String> answers
) {
}
