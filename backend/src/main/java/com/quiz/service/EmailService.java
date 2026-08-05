package com.quiz.service;

import com.quiz.model.Quiz;
import com.quiz.model.Result;
import com.quiz.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.email.mock:true}")
    private boolean mockEmail;

    public void sendRegistrationEmail(User user) {
        String subject = "Welcome to Online Quiz Application!";
        String body = "Hi " + user.getFullName() + ",\n\n"
                + "Thank you for registering with our Online Quiz Application.\n"
                + "You can now login and start taking quizzes!\n\n"
                + "Best regards,\nQuiz App Team";
        sendEmail(user.getEmail(), subject, body);
    }

    public void sendQuizCompletionEmail(User user, Quiz quiz, Result result) {
        String subject = "Quiz Completed: " + quiz.getTitle();
        String body = "Hi " + user.getFullName() + ",\n\n"
                + "You have completed the quiz: " + quiz.getTitle() + "\n"
                + "Your Score: " + result.getScore() + "/" + result.getTotalMarks() + "\n\n"
                + "Keep learning and keep quizzing!\n\n"
                + "Best regards,\nQuiz App Team";
        sendEmail(user.getEmail(), subject, body);
    }

    public void sendResultNotification(User user, Result result) {
        String subject = "Your Quiz Result";
        String body = "Hi " + user.getFullName() + ",\n\n"
                + "Your result for the recent quiz:\n"
                + "Score: " + result.getScore() + "/" + result.getTotalMarks() + "\n"
                + "Percentage: " + ((result.getScore() * 100) / result.getTotalMarks()) + "%\n\n"
                + "Best regards,\nQuiz App Team";
        sendEmail(user.getEmail(), subject, body);
    }

    private void sendEmail(String to, String subject, String body) {
        if (mockEmail) {
            System.out.println("=== MOCK EMAIL ===");
            System.out.println("To: " + to);
            System.out.println("Subject: " + subject);
            System.out.println("Body: " + body);
            System.out.println("=== END EMAIL ===");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}
