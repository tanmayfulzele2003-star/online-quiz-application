import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  timeLimit: z.coerce.number().int().min(0, "Time limit must be 0 or more"),
  totalMarks: z.coerce.number().int().min(0, "Total marks must be 0 or more"),
});

export const questionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(["A", "B", "C", "D"], { message: "Select the correct answer" }),
  marks: z.coerce.number().int().min(0, "Marks must be 0 or more"),
});
