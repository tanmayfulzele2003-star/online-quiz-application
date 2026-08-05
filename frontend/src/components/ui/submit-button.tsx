"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  children: ReactNode;
  pendingText?: string;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function SubmitButton({
  children,
  pendingText = "Saving…",
  className,
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      aria-busy={pending}
      className={cn(className)}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
