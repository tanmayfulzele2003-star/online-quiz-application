"use client";

import { useActionState } from "react";
import type { QuizFormState } from "@/lib/actions/admin";
import { Field, Input, Textarea } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/alert";
import type { QuizDto } from "@/types/api";

const initialState: QuizFormState = {};

export function QuizForm({
  action,
  quiz,
  submitLabel = "Save quiz",
}: {
  action: (prevState: QuizFormState, formData: FormData) => Promise<QuizFormState>;
  quiz?: QuizDto;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.error && <Alert tone="danger">{state.error}</Alert>}

      <Field label="Title" htmlFor="title" error={state.fieldErrors?.title} required>
        <Input
          id="title"
          name="title"
          defaultValue={quiz?.title}
          aria-invalid={Boolean(state.fieldErrors?.title)}
        />
      </Field>

      <Field label="Description" htmlFor="description" error={state.fieldErrors?.description}>
        <Textarea id="description" name="description" defaultValue={quiz?.description ?? ""} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Time limit (minutes)"
          htmlFor="timeLimit"
          error={state.fieldErrors?.timeLimit}
          required
        >
          <Input
            id="timeLimit"
            name="timeLimit"
            type="number"
            min={0}
            defaultValue={quiz?.timeLimit ?? 10}
          />
        </Field>
        <Field
          label="Total marks"
          htmlFor="totalMarks"
          error={state.fieldErrors?.totalMarks}
          required
        >
          <Input
            id="totalMarks"
            name="totalMarks"
            type="number"
            min={0}
            defaultValue={quiz?.totalMarks ?? 0}
          />
        </Field>
      </div>

      <SubmitButton pendingText="Saving…" className="self-start">
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
