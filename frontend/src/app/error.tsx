"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-medium text-danger">Something went wrong</p>
      <h1 className="text-2xl font-semibold tracking-tight">We hit a snag</h1>
      <p className="text-sm text-muted-foreground">
        Please try again. If the problem continues, come back a little later.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
