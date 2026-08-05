-- Sample data for Online Quiz Application
-- Note: Passwords are BCrypt encoded. The application's DataInitializer
-- will auto-insert sample data on first run, so this is for reference only.

-- Sample Users (passwords shown in comments)
-- admin@quiz.com / admin123
-- john@quiz.com / john123

INSERT INTO quizzes (title, description, time_limit, total_marks) VALUES
('Java Basics', 'Test your knowledge of core Java concepts', 15, 50),
('Spring Boot Fundamentals', 'Test your knowledge of Spring Boot framework', 10, 40),
('SQL Fundamentals', 'Basic SQL query knowledge test', 12, 30);

-- Java Basics Questions
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, marks, quiz_id) VALUES
('What is the default value of int in Java?', '0', 'null', 'undefined', '1', 'A', 10, 1),
('Which keyword is used to inherit a class in Java?', 'implements', 'extends', 'inherits', 'super', 'B', 10, 1),
('Which collection does not allow duplicate elements?', 'ArrayList', 'LinkedList', 'HashSet', 'Vector', 'C', 10, 1),
('What is the size of int in Java?', '16 bit', '32 bit', '64 bit', '8 bit', 'B', 10, 1),
('Which method is the entry point of a Java program?', 'start()', 'main()', 'run()', 'init()', 'B', 10, 1);

-- Spring Boot Questions
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, marks, quiz_id) VALUES
('What annotation marks a Spring Boot application class?', '@SpringApp', '@SpringBootApplication', '@Application', '@Boot', 'B', 10, 2),
('Which starter is used for web applications?', 'spring-boot-starter-web', 'spring-boot-starter-app', 'spring-web', 'spring-starter', 'A', 10, 2),
('What does @Autowired do?', 'Creates a new bean', 'Injects a dependency', 'Defines a route', 'Starts the server', 'B', 10, 2),
('Which file is used for configuration?', 'config.xml', 'settings.json', 'application.properties', 'boot.yml', 'C', 10, 2);
