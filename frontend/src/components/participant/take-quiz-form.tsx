"use client";

import { useActionState, useRef } from "react";
import { submitQuizAction, type SubmitQuizState } from "@/lib/actions/participant";
import { useCountdown } from "@/hooks/use-countdown";
import { ANSWER_LETTERS, getOptionText } from "@/components/participant/quiz-option";
import { QuizResultSummary } from "@/components/participant/quiz-result-summary";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import type { QuestionPublicDto, QuizDto } from "@/types/api";

const initialState: SubmitQuizState = {};

export function TakeQuizForm({
  quiz,
  questions,
}: {
  quiz: QuizDto;
  questions: QuestionPublicDto[];
}) {
  const boundAction = submitQuizAction.bind(null, quiz.id);
  const [state, formAction] = useActionState(boundAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const secondsLeft = useCountdown(Math.max(quiz.timeLimit, 0) * 60, () => {
    formRef.current?.requestSubmit();
  });

  if (state.result) {
    return <QuizResultSummary result={state.result} />;
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const lowTime = secondsLeft <= 30 && secondsLeft > 0;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      {state.error && <Alert tone="danger">{state.error}</Alert>}

      <div
        role="timer"
        aria-live="polite"
        className="sticky top-0 z-10 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
      >
        <span className="text-sm font-medium text-foreground">Time remaining</span>
        <span
          className={cn(
            "font-mono text-lg font-semibold text-foreground",
            lowTime && "text-danger"
          )}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      {questions.map((question, index) => (
        <fieldset key={question.id} className="rounded-xl border border-border bg-card p-5">
          <legend className="px-1 text-sm font-medium text-foreground">
            {index + 1}. {question.questionText}{" "}
            <span className="font-normal text-muted-foreground">({question.marks} marks)</span>
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {ANSWER_LETTERS.map((letter) => (
              <label
                key={letter}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name={`answer-${question.id}`}
                  value={letter}
                  required
                  className="h-4 w-4 accent-primary"
                />
                <span>{getOptionText(question, letter)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <SubmitButton pendingText="Submitting…" className="w-full">
        Submit quiz
      </SubmitButton>
    </form>
  );
}
