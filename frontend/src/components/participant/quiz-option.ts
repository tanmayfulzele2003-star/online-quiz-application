import type { QuestionPublicDto } from "@/types/api";

export const ANSWER_LETTERS = ["A", "B", "C", "D"] as const;
export type AnswerLetter = (typeof ANSWER_LETTERS)[number];

export function getOptionText(question: QuestionPublicDto, letter: AnswerLetter): string {
  switch (letter) {
    case "A":
      return question.optionA;
    case "B":
      return question.optionB;
    case "C":
      return question.optionC;
    case "D":
      return question.optionD;
  }
}
