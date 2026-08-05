"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function DeleteForm({
  action,
  confirmMessage,
  children,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <Button type="submit" variant="danger" size="sm">
        {children}
      </Button>
    </form>
  );
}
