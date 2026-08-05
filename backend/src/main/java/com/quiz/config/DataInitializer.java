package com.quiz.config;

import com.quiz.model.Question;
import com.quiz.model.Quiz;
import com.quiz.model.User;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;
import com.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User("Admin User", "admin@quiz.com",
                    passwordEncoder.encode("admin123"), "ADMIN");
            userRepository.save(admin);

            // Create participant user
            User participant = new User("John Doe", "john@quiz.com",
                    passwordEncoder.encode("john123"), "PARTICIPANT");
            userRepository.save(participant);

            // Create sample quiz - Java Basics
            Quiz javaQuiz = new Quiz("Java Basics", "Test your knowledge of core Java concepts", 15, 50);
            javaQuiz = quizRepository.save(javaQuiz);

            questionRepository.save(createQuestion(javaQuiz,
                    "What is the default value of int in Java?",
                    "0", "null", "undefined", "1", "A", 10));
            questionRepository.save(createQuestion(javaQuiz,
                    "Which keyword is used to inherit a class in Java?",
                    "implements", "extends", "inherits", "super", "B", 10));
            questionRepository.save(createQuestion(javaQuiz,
                    "Which collection does not allow duplicate elements?",
                    "ArrayList", "LinkedList", "HashSet", "Vector", "C", 10));
            questionRepository.save(createQuestion(javaQuiz,
                    "What is the size of int in Java?",
                    "16 bit", "32 bit", "64 bit", "8 bit", "B", 10));
            questionRepository.save(createQuestion(javaQuiz,
                    "Which method is the entry point of a Java program?",
                    "start()", "main()", "run()", "init()", "B", 10));

            // Create sample quiz - Spring Boot
            Quiz springQuiz = new Quiz("Spring Boot Fundamentals",
                    "Test your knowledge of Spring Boot framework", 10, 40);
            springQuiz = quizRepository.save(springQuiz);

            questionRepository.save(createQuestion(springQuiz,
                    "What annotation is used to mark a Spring Boot application class?",
                    "@SpringApp", "@SpringBootApplication", "@Application", "@Boot", "B", 10));
            questionRepository.save(createQuestion(springQuiz,
                    "Which starter is used for web applications?",
                    "spring-boot-starter-web", "spring-boot-starter-app", "spring-web", "spring-starter", "A", 10));
            questionRepository.save(createQuestion(springQuiz,
                    "What does @Autowired do?",
                    "Creates a new bean", "Injects a dependency", "Defines a route", "Starts the server", "B", 10));
            questionRepository.save(createQuestion(springQuiz,
                    "Which file is used for configuration in Spring Boot?",
                    "config.xml", "settings.json", "application.properties", "boot.yml", "C", 10));

            System.out.println("Sample data initialized!");
            System.out.println("Admin: admin@quiz.com / admin123");
            System.out.println("Participant: john@quiz.com / john123");
        }
    }

    private Question createQuestion(Quiz quiz, String text, String a, String b,
                                    String c, String d, String correct, int marks) {
        Question q = new Question();
        q.setQuiz(quiz);
        q.setQuestionText(text);
        q.setOptionA(a);
        q.setOptionB(b);
        q.setOptionC(c);
        q.setOptionD(d);
        q.setCorrectAnswer(correct);
        q.setMarks(marks);
        return q;
    }
}
