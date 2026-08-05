import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import type { QuizDto } from "@/types/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Quizzes",
};

export default async function QuizzesPage() {
  const quizzes = await apiFetch<QuizDto[]>("/api/participant/quizzes");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Available quizzes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pick a quiz and beat the clock.</p>
      </div>

      {quizzes.length === 0 ? (
        <EmptyState
          title="No quizzes yet"
          description="Check back soon — an admin hasn't published any quizzes."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description || "No description provided."}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-wrap gap-2">
                <Badge>{quiz.questionCount} questions</Badge>
                <Badge>{quiz.timeLimit} min</Badge>
                <Badge>{quiz.totalMarks} marks</Badge>
              </CardContent>
              <CardFooter>
                <ButtonLink href={`/participant/quiz/${quiz.id}`} className="w-full">
                  Start quiz
                </ButtonLink>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
