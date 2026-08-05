export type Role = "ADMIN" | "PARTICIPANT";

export interface AuthResponse {
  token: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface UserDto {
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

export interface QuizDto {
  id: number;
  title: string;
  description: string | null;
  timeLimit: number;
  totalMarks: number;
  questionCount: number;
}

export interface QuestionPublicDto {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  marks: number;
}

export interface QuestionAdminDto extends QuestionPublicDto {
  correctAnswer: "A" | "B" | "C" | "D";
  quizId: number;
}

export interface QuizTakeResponse {
  quiz: QuizDto;
  questions: QuestionPublicDto[];
}

export interface QuizWithQuestionsResponse {
  quiz: QuizDto;
  questions: QuestionAdminDto[];
}

export interface ResultDto {
  id: number;
  quizId: number;
  quizTitle: string;
  score: number;
  totalMarks: number;
  attemptDate: string;
}

export interface ParticipantDashboardResponse {
  user: UserDto;
  results: ResultDto[];
  totalQuizzes: number;
  attemptCount: number;
}

export interface AdminDashboardResponse {
  totalQuizzes: number;
  totalUsers: number;
  quizzes: QuizDto[];
}

export interface ApiErrorBody {
  error?: string;
}
