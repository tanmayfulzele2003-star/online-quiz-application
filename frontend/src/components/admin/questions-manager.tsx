"use client";

import { useState } from "react";
import {
  createQuestionAction,
  updateQuestionAction,
  deleteQuestionAction,
} from "@/lib/actions/admin";
import { QuestionForm } from "@/components/admin/question-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type { QuestionAdminDto } from "@/types/api";

export function QuestionsManager({
  quizId,
  questions,
}: {
  quizId: number;
  questions: QuestionAdminDto[];
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {questions.length === 0 && !adding && (
        <EmptyState title="No questions yet" description="Add your first question below." />
      )}

      <ul className="flex flex-col gap-3">
        {questions.map((question, index) => (
          <li key={question.id}>
            <Card>
              <CardContent className="flex flex-col gap-3">
                {editingId === question.id ? (
                  <QuestionForm
                    question={question}
                    action={updateQuestionAction.bind(null, question.id, quizId)}
                    submitLabel="Update question"
                    onSaved={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-foreground">
                        {index + 1}. {question.questionText}
                      </p>
                      <Badge tone="success">Answer: {question.correctAnswer}</Badge>
                    </div>
                    <ul className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                      <li>A. {question.optionA}</li>
                      <li>B. {question.optionB}</li>
                      <li>C. {question.optionC}</li>
                      <li>D. {question.optionD}</li>
                    </ul>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingId(question.id)}
                      >
                        Edit
                      </Button>
                      <DeleteForm
                        action={deleteQuestionAction.bind(null, question.id, quizId)}
                        confirmMessage="Delete this question? This cannot be undone."
                      >
                        Delete
                      </DeleteForm>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      {adding ? (
        <Card>
          <CardContent>
            <QuestionForm
              action={createQuestionAction.bind(null, quizId)}
              submitLabel="Add question"
              onSaved={() => setAdding(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Button variant="secondary" onClick={() => setAdding(true)} className="self-start">
          Add question
        </Button>
      )}
    </div>
  );
}
