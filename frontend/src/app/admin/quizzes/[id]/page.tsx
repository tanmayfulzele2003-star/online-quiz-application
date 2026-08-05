import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { updateQuizAction, deleteQuizAction } from "@/lib/actions/admin";
import type { QuizWithQuestionsResponse } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizForm } from "@/components/admin/quiz-form";
import { QuestionsManager } from "@/components/admin/questions-manager";
import { DeleteForm } from "@/components/admin/delete-form";

export const metadata: Metadata = {
  title: "Manage quiz",
};

export default async function AdminQuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quizId = Number(id);
  if (!Number.isFinite(quizId)) notFound();

  let data: QuizWithQuestionsResponse;
  try {
    data = await apiFetch<QuizWithQuestionsResponse>(`/api/admin/quizzes/${quizId}/questions`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{data.quiz.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit the quiz details and manage its questions.
          </p>
        </div>
        <DeleteForm
          action={deleteQuizAction.bind(null, quizId)}
          confirmMessage={`Delete "${data.quiz.title}" and all its questions? This cannot be undone.`}
        >
          Delete quiz
        </DeleteForm>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz details</CardTitle>
        </CardHeader>
        <CardContent>
          <QuizForm
            action={updateQuizAction.bind(null, quizId)}
            quiz={data.quiz}
            submitLabel="Save changes"
          />
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold">Questions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {data.questions.length} question{data.questions.length === 1 ? "" : "s"} in this quiz.
        </p>
        <div className="mt-4">
          <QuestionsManager quizId={quizId} questions={data.questions} />
        </div>
      </div>
    </div>
  );
}
