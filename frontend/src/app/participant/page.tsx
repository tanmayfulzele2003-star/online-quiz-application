import type { Metadata } from "next";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatDate, percentage } from "@/lib/utils";
import type { ParticipantDashboardResponse } from "@/types/api";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function ParticipantDashboardPage() {
  const dashboard = await apiFetch<ParticipantDashboardResponse>("/api/participant/dashboard");
  const recentResults = dashboard.results.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {dashboard.user.fullName.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a snapshot of your quiz activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Quizzes available</CardDescription>
            <CardTitle className="text-3xl">{dashboard.totalQuizzes}</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Attempts made</CardDescription>
            <CardTitle className="text-3xl">{dashboard.attemptCount}</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1">
            <CardDescription>Account role</CardDescription>
            <CardTitle className="text-3xl">Participant</CardTitle>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent attempts</h2>
          <ButtonLink href="/participant/quizzes" variant="secondary" size="sm" prefetch={false}>
            Browse quizzes
          </ButtonLink>
        </div>

        {recentResults.length === 0 ? (
          <EmptyState
            title="No attempts yet"
            description="Take your first quiz to see your results here."
            action={
              <ButtonLink href="/participant/quizzes" prefetch={false}>
                Start a quiz
              </ButtonLink>
            }
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {recentResults.map((result) => (
              <li key={result.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{result.quizTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(result.attemptDate)}
                      </p>
                    </div>
                    <Badge tone={percentage(result.score, result.totalMarks) >= 50 ? "success" : "danger"}>
                      {result.score} / {result.totalMarks} ·{" "}
                      {percentage(result.score, result.totalMarks)}%
                    </Badge>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}

        {dashboard.results.length > 5 && (
          <Link
            href="/participant/results"
            prefetch={false}
            className="self-start text-sm font-medium text-primary hover:underline"
          >
            View all results →
          </Link>
        )}
      </div>
    </div>
  );
}
