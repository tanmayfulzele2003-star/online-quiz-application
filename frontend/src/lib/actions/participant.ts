"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { profileSchema } from "@/lib/validations";
import { flattenFieldErrors } from "@/lib/form-errors";
import type { ResultDto, UserDto } from "@/types/api";

export interface SubmitQuizState {
  result?: ResultDto;
  error?: string;
}

export async function submitQuizAction(
  quizId: number,
  _prevState: SubmitQuizState,
  formData: FormData
): Promise<SubmitQuizState> {
  const answers: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("answer-") && typeof value === "string") {
      answers[key.slice("answer-".length)] = value;
    }
  }

  try {
    const result = await apiFetch<ResultDto>(`/api/participant/quiz/${quizId}/submit`, {
      method: "POST",
      body: { answers },
    });
    revalidatePath("/participant");
    revalidatePath("/participant/results");
    return { result };
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong submitting your quiz. Please try again." };
  }
}

export interface ProfileFormState {
  user?: UserDto;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function updateProfileAction(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const parsed = profileSchema.safeParse({ fullName: formData.get("fullName") });
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  try {
    const user = await apiFetch<UserDto>("/api/participant/profile", {
      method: "PUT",
      body: parsed.data,
    });
    revalidatePath("/participant");
    revalidatePath("/participant/profile");
    return { user };
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }
}
