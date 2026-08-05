"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { quizSchema, questionSchema } from "@/lib/validations";
import { flattenFieldErrors } from "@/lib/form-errors";
import type { QuestionAdminDto, QuizDto } from "@/types/api";

export interface QuizFormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function createQuizAction(
  _prevState: QuizFormState,
  formData: FormData
): Promise<QuizFormState> {
  const parsed = quizSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    timeLimit: formData.get("timeLimit"),
    totalMarks: formData.get("totalMarks"),
  });
  if (!parsed.success) return { fieldErrors: flattenFieldErrors(parsed.error) };

  let quiz: QuizDto;
  try {
    quiz = await apiFetch<QuizDto>("/api/admin/quizzes", { method: "POST", body: parsed.data });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/quizzes");
  redirect(`/admin/quizzes/${quiz.id}`);
}

export async function updateQuizAction(
  quizId: number,
  _prevState: QuizFormState,
  formData: FormData
): Promise<QuizFormState> {
  const parsed = quizSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    timeLimit: formData.get("timeLimit"),
    totalMarks: formData.get("totalMarks"),
  });
  if (!parsed.success) return { fieldErrors: flattenFieldErrors(parsed.error) };

  try {
    await apiFetch<QuizDto>(`/api/admin/quizzes/${quizId}`, {
      method: "PUT",
      body: parsed.data,
    });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/quizzes");
  revalidatePath(`/admin/quizzes/${quizId}`);
  return {};
}

export async function deleteQuizAction(quizId: number): Promise<void> {
  await apiFetch<void>(`/api/admin/quizzes/${quizId}`, { method: "DELETE" });
  revalidatePath("/admin");
  revalidatePath("/admin/quizzes");
  redirect("/admin/quizzes");
}

export interface QuestionFormState {
  error?: string;
  fieldErrors?: Record<string, string>;
  savedQuestion?: QuestionAdminDto;
}

export async function createQuestionAction(
  quizId: number,
  _prevState: QuestionFormState,
  formData: FormData
): Promise<QuestionFormState> {
  const parsed = questionSchema.safeParse({
    questionText: formData.get("questionText"),
    optionA: formData.get("optionA"),
    optionB: formData.get("optionB"),
    optionC: formData.get("optionC"),
    optionD: formData.get("optionD"),
    correctAnswer: formData.get("correctAnswer"),
    marks: formData.get("marks"),
  });
  if (!parsed.success) return { fieldErrors: flattenFieldErrors(parsed.error) };

  let savedQuestion: QuestionAdminDto;
  try {
    savedQuestion = await apiFetch<QuestionAdminDto>(`/api/admin/quizzes/${quizId}/questions`, {
      method: "POST",
      body: parsed.data,
    });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath(`/admin/quizzes/${quizId}`);
  revalidatePath("/admin/quizzes");
  revalidatePath("/admin");
  return { savedQuestion };
}

export async function updateQuestionAction(
  questionId: number,
  quizId: number,
  _prevState: QuestionFormState,
  formData: FormData
): Promise<QuestionFormState> {
  const parsed = questionSchema.safeParse({
    questionText: formData.get("questionText"),
    optionA: formData.get("optionA"),
    optionB: formData.get("optionB"),
    optionC: formData.get("optionC"),
    optionD: formData.get("optionD"),
    correctAnswer: formData.get("correctAnswer"),
    marks: formData.get("marks"),
  });
  if (!parsed.success) return { fieldErrors: flattenFieldErrors(parsed.error) };

  let savedQuestion: QuestionAdminDto;
  try {
    savedQuestion = await apiFetch<QuestionAdminDto>(`/api/admin/questions/${questionId}`, {
      method: "PUT",
      body: parsed.data,
    });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath(`/admin/quizzes/${quizId}`);
  return { savedQuestion };
}

export async function deleteQuestionAction(questionId: number, quizId: number): Promise<void> {
  await apiFetch<void>(`/api/admin/questions/${questionId}`, { method: "DELETE" });
  revalidatePath(`/admin/quizzes/${quizId}`);
  revalidatePath("/admin/quizzes");
  revalidatePath("/admin");
}
