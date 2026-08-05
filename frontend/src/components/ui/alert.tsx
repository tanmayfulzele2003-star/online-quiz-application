import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "danger" | "success" | "warning" | "info";

const toneClasses: Record<Tone, string> = {
  danger: "border-danger/30 bg-danger/10 text-danger",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  info: "border-primary/30 bg-primary/10 text-primary",
};

interface AlertProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Alert({ tone = "info", children, className }: AlertProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("rounded-lg border px-4 py-3 text-sm", toneClasses[tone], className)}
    >
      {children}
    </div>
  );
}
