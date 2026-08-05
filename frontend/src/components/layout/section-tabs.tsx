"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Tab {
  href: string;
  label: string;
}

export function SectionTabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Section" className={cn("border-b border-border bg-card", className)}>
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-12 items-center whitespace-nowrap border-b-2 px-3 text-sm font-medium",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
