"use client";

import { useActionState } from "react";
import { registerAction, type AuthFormState } from "@/lib/actions/auth";
import { Field, Input } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/alert";

const initialState: AuthFormState = {};

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.error && <Alert tone="danger">{state.error}</Alert>}

      <Field label="Full name" htmlFor="fullName" error={state.fieldErrors?.fullName} required>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(state.fieldErrors?.fullName)}
        />
      </Field>

      <Field label="Email" htmlFor="email" error={state.fieldErrors?.email} required>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
      </Field>

      <Field
        label="Password"
        htmlFor="password"
        error={state.fieldErrors?.password}
        hint="At least 6 characters."
        required
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
      </Field>

      <Field
        label="Confirm password"
        htmlFor="confirmPassword"
        error={state.fieldErrors?.confirmPassword}
        required
      >
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
        />
      </Field>

      <SubmitButton pendingText="Creating account…" className="mt-2 w-full">
        Create account
      </SubmitButton>
    </form>
  );
}
