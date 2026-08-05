import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Timed quizzes",
    description: "Take quizzes with a live countdown that auto-submits when time runs out.",
  },
  {
    title: "Instant results",
    description: "See your score the moment you submit, with a full history of past attempts.",
  },
  {
    title: "Admin control",
    description: "Create quizzes, manage questions, and review every registered user.",
  },
];

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/participant");
  }

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-8 px-4 py-20 text-center sm:px-6">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          GUVI-HCL Full Stack Assignment
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Test your knowledge with QuizNest
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Browse quizzes, race the clock, and track your progress over time — or sign in as an
          admin to build the next quiz.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/register" size="lg">
            Create a free account
          </ButtonLink>
          <ButtonLink href="/login" variant="secondary" size="lg">
            Log in
          </ButtonLink>
        </div>

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-left">
              <CardContent className="flex flex-col gap-2">
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
