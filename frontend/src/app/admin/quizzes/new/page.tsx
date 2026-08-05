import type { Metadata } from "next";
import { createQuizAction } from "@/lib/actions/admin";
import { QuizForm } from "@/components/admin/quiz-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "New quiz",
};

export default function NewQuizPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create a quiz</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add the quiz details, then add questions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz details</CardTitle>
        </CardHeader>
        <CardContent>
          <QuizForm action={createQuizAction} submitLabel="Create quiz" />
        </CardContent>
      </Card>
    </div>
  );
}
