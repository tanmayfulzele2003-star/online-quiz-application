"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileFormState } from "@/lib/actions/participant";
import { Field, Input } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/alert";
import type { UserDto } from "@/types/api";

const initialState: ProfileFormState = {};

export function ProfileForm({ user }: { user: UserDto }) {
  const [state, formAction] = useActionState(updateProfileAction, initialState);
  const currentUser = state.user ?? user;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.user && <Alert tone="success">Profile updated.</Alert>}

      <Field label="Full name" htmlFor="fullName" error={state.fieldErrors?.fullName} required>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={currentUser.fullName}
          autoComplete="name"
          aria-invalid={Boolean(state.fieldErrors?.fullName)}
        />
      </Field>

      <Field label="Email" htmlFor="email" hint="Email cannot be changed.">
        <Input id="email" type="email" value={currentUser.email} disabled readOnly />
      </Field>

      <SubmitButton pendingText="Saving…" className="self-start">
        Save changes
      </SubmitButton>
    </form>
  );
}
