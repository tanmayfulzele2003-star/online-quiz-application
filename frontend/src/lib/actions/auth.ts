"use server";

import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";
import { loginSchema, registerSchema } from "@/lib/validations";
import { flattenFieldErrors } from "@/lib/form-errors";
import type { AuthResponse, Role } from "@/types/api";

export interface AuthFormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

function roleHome(role: Role): string {
  return role === "ADMIN" ? "/admin" : "/participant";
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  let role: Role;
  try {
    const auth = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: parsed.data,
      auth: false,
    });
    await setSessionCookie(auth.token);
    role = auth.role;
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  redirect(roleHome(role));
}

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  let role: Role;
  try {
    const auth = await apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: parsed.data,
      auth: false,
    });
    await setSessionCookie(auth.token);
    role = auth.role;
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  redirect(roleHome(role));
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/login");
}
