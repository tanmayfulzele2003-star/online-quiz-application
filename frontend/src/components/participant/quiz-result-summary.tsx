import { percentage } from "@/lib/utils";
import type { ResultDto } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function QuizResultSummary({ result }: { result: ResultDto }) {
  const pct = percentage(result.score, result.totalMarks);
  const passed = pct >= 50;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz complete: {result.quizTitle}</CardTitle>
        <CardDescription>Your response has been recorded.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="text-5xl font-semibold tracking-tight">
          {result.score}
          <span className="text-2xl text-muted-foreground"> / {result.totalMarks}</span>
        </p>
        <Badge tone={passed ? "success" : "danger"}>{pct}% score</Badge>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/participant/quizzes" variant="secondary" prefetch={false}>
            Try another quiz
          </ButtonLink>
          <ButtonLink href="/participant/results" prefetch={false}>
            View all results
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  );
}
