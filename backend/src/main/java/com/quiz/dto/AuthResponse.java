package com.quiz.dto;

public record AuthResponse(
        String token,
        String fullName,
        String email,
        String role
) {
}
