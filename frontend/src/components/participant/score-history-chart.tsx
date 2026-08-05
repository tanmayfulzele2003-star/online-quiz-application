import { percentage } from "@/lib/utils";
import type { ResultDto } from "@/types/api";

const WIDTH = 640;
const HEIGHT = 200;
const PADDING = 24;

export function ScoreHistoryChart({ results }: { results: ResultDto[] }) {
  const chronological = [...results].sort(
    (a, b) => new Date(a.attemptDate).getTime() - new Date(b.attemptDate).getTime()
  );

  const plotWidth = WIDTH - PADDING * 2;
  const plotHeight = HEIGHT - PADDING * 2;
  const barGap = 8;
  const barWidth = Math.max(
    plotWidth / chronological.length - barGap,
    chronological.length > 20 ? 4 : 16
  );

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby="score-history-title"
        className="w-full text-primary"
      >
        <title id="score-history-title">Score percentage over your last attempts</title>
        <line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke="var(--color-border)"
          strokeWidth={1}
        />
        {[0, 50, 100].map((tick) => {
          const y = HEIGHT - PADDING - (tick / 100) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={PADDING}
                y1={y}
                x2={WIDTH - PADDING}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth={0.5}
                strokeDasharray="4 4"
              />
              <text x={4} y={y + 3} fontSize={9} fill="var(--color-muted-foreground)">
                {tick}%
              </text>
            </g>
          );
        })}
        {chronological.map((result, index) => {
          const pct = percentage(result.score, result.totalMarks);
          const barHeight = (pct / 100) * plotHeight;
          const x = PADDING + index * (barWidth + barGap);
          const y = HEIGHT - PADDING - barHeight;
          return (
            <rect
              key={result.id}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={2}
              fill={pct >= 50 ? "var(--color-success)" : "var(--color-danger)"}
            >
              <title>
                {result.quizTitle}: {pct}% ({result.score}/{result.totalMarks})
              </title>
            </rect>
          );
        })}
      </svg>
      <figcaption className="sr-only">
        Bar chart showing your score percentage across {chronological.length} quiz attempts, in
        chronological order.
      </figcaption>
    </figure>
  );
}
