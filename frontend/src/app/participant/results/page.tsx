import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { formatDate, percentage } from "@/lib/utils";
import type { ResultDto } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreHistoryChart } from "@/components/participant/score-history-chart";

export const metadata: Metadata = {
  title: "Results",
};

export default async function ResultsPage() {
  const results = await apiFetch<ResultDto[]>("/api/participant/results");
  const sortedDescending = [...results].sort(
    (a, b) => new Date(b.attemptDate).getTime() - new Date(a.attemptDate).getTime()
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your results</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review every quiz attempt and track your progress.
        </p>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No results yet"
          description="Take a quiz to start building your score history."
          action={<ButtonLink href="/participant/quizzes">Browse quizzes</ButtonLink>}
        />
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Score history</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreHistoryChart results={results} />
            </CardContent>
          </Card>

          <ul className="flex flex-col gap-3">
            {sortedDescending.map((result) => (
              <li key={result.id}>
                <Card>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{result.quizTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(result.attemptDate)}
                      </p>
                    </div>
                    <Badge
                      tone={percentage(result.score, result.totalMarks) >= 50 ? "success" : "danger"}
                    >
                      {result.score} / {result.totalMarks} ·{" "}
                      {percentage(result.score, result.totalMarks)}%
                    </Badge>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
