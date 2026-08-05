"use client";

import { useActionState, useEffect } from "react";
import type { QuestionFormState } from "@/lib/actions/admin";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/alert";
import type { QuestionAdminDto } from "@/types/api";

const initialState: QuestionFormState = {};

export function QuestionForm({
  action,
  question,
  submitLabel = "Save question",
  onSaved,
}: {
  action: (prevState: QuestionFormState, formData: FormData) => Promise<QuestionFormState>;
  question?: QuestionAdminDto;
  submitLabel?: string;
  onSaved?: () => void;
}) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.savedQuestion) onSaved?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.savedQuestion]);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.error && <Alert tone="danger">{state.error}</Alert>}

      <Field
        label="Question text"
        htmlFor="questionText"
        error={state.fieldErrors?.questionText}
        required
      >
        <Textarea
          id="questionText"
          name="questionText"
          defaultValue={question?.questionText}
          rows={2}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Option A" htmlFor="optionA" error={state.fieldErrors?.optionA} required>
          <Input id="optionA" name="optionA" defaultValue={question?.optionA} />
        </Field>
        <Field label="Option B" htmlFor="optionB" error={state.fieldErrors?.optionB} required>
          <Input id="optionB" name="optionB" defaultValue={question?.optionB} />
        </Field>
        <Field label="Option C" htmlFor="optionC" error={state.fieldErrors?.optionC} required>
          <Input id="optionC" name="optionC" defaultValue={question?.optionC} />
        </Field>
        <Field label="Option D" htmlFor="optionD" error={state.fieldErrors?.optionD} required>
          <Input id="optionD" name="optionD" defaultValue={question?.optionD} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Correct answer"
          htmlFor="correctAnswer"
          error={state.fieldErrors?.correctAnswer}
          required
        >
          <Select id="correctAnswer" name="correctAnswer" defaultValue={question?.correctAnswer ?? "A"}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </Select>
        </Field>
        <Field label="Marks" htmlFor="marks" error={state.fieldErrors?.marks} required>
          <Input id="marks" name="marks" type="number" min={0} defaultValue={question?.marks ?? 10} />
        </Field>
      </div>

      <SubmitButton pendingText="Saving…" className="self-start">
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
