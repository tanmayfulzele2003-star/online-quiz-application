import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import type { AdminDashboardResponse } from "@/types/api";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

export default async function AdminDashboardPage() {
  const dashboard = await apiFetch<AdminDashboardResponse>("/api/admin/dashboard");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage quizzes, questions, and registered users.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Total quizzes</CardDescription>
            <CardTitle className="text-3xl">{dashboard.totalQuizzes}</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Registered users</CardDescription>
            <CardTitle className="text-3xl">{dashboard.totalUsers}</CardTitle>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quizzes</h2>
          <ButtonLink href="/admin/quizzes" size="sm" variant="secondary" prefetch={false}>
            Manage quizzes
          </ButtonLink>
        </div>

        {dashboard.quizzes.length === 0 ? (
          <EmptyState
            title="No quizzes yet"
            description="Create your first quiz to get started."
            action={
              <ButtonLink href="/admin/quizzes" prefetch={false}>
                Create a quiz
              </ButtonLink>
            }
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {dashboard.quizzes.map((quiz) => (
              <li key={quiz.id}>
                <Card>
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-medium text-foreground">{quiz.title}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{quiz.questionCount} questions</Badge>
                      <Badge>{quiz.totalMarks} marks</Badge>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
