package com.quiz.dto;

import com.quiz.model.User;

public record UserDto(
        Long id,
        String fullName,
        String email,
        String role
) {
    public static UserDto from(User user) {
        return new UserDto(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }
}
