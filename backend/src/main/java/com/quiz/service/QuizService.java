package com.quiz.service;

import com.quiz.model.Quiz;
import com.quiz.repository.QuizRepository;
import com.quiz.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ResultRepository resultRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    public Quiz saveQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Transactional
    public void deleteQuiz(Long id) {
        resultRepository.deleteAll(resultRepository.findByQuizId(id));
        quizRepository.deleteById(id);
    }

    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        Quiz existing = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        existing.setTitle(updatedQuiz.getTitle());
        existing.setDescription(updatedQuiz.getDescription());
        existing.setTimeLimit(updatedQuiz.getTimeLimit());
        existing.setTotalMarks(updatedQuiz.getTotalMarks());
        return quizRepository.save(existing);
    }
}
