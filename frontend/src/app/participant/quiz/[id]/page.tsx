import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import type { QuizTakeResponse } from "@/types/api";
import { TakeQuizForm } from "@/components/participant/take-quiz-form";

export const metadata: Metadata = {
  title: "Take quiz",
};

export default async function TakeQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quizId = Number(id);
  if (!Number.isFinite(quizId)) notFound();

  let data: QuizTakeResponse;
  try {
    data = await apiFetch<QuizTakeResponse>(`/api/participant/quiz/${quizId}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{data.quiz.title}</h1>
        {data.quiz.description && (
          <p className="mt-1 text-sm text-muted-foreground">{data.quiz.description}</p>
        )}
      </div>
      <TakeQuizForm quiz={data.quiz} questions={data.questions} />
    </div>
  );
}
