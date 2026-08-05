export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} QuizNest. Built for the GUVI-HCL Full Stack assignment.</p>
      </div>
    </footer>
  );
}
