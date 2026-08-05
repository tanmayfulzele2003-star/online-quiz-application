import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { deleteQuizAction } from "@/lib/actions/admin";
import type { QuizDto } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { DeleteForm } from "@/components/admin/delete-form";

export const metadata: Metadata = {
  title: "Manage quizzes",
};

export default async function AdminQuizzesPage() {
  const quizzes = await apiFetch<QuizDto[]>("/api/admin/quizzes");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quizzes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage quizzes and their questions.
          </p>
        </div>
        <ButtonLink href="/admin/quizzes/new">New quiz</ButtonLink>
      </div>

      {quizzes.length === 0 ? (
        <EmptyState
          title="No quizzes yet"
          description="Create your first quiz to start building questions."
          action={<ButtonLink href="/admin/quizzes/new">Create a quiz</ButtonLink>}
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Card>
                <CardContent className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{quiz.title}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge>{quiz.questionCount} questions</Badge>
                      <Badge>{quiz.timeLimit} min</Badge>
                      <Badge>{quiz.totalMarks} marks</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ButtonLink
                      href={`/admin/quizzes/${quiz.id}`}
                      variant="secondary"
                      size="sm"
                      prefetch={false}
                    >
                      Manage
                    </ButtonLink>
                    <DeleteForm
                      action={deleteQuizAction.bind(null, quiz.id)}
                      confirmMessage={`Delete "${quiz.title}"? This cannot be undone.`}
                    >
                      Delete
                    </DeleteForm>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
