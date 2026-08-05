import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SectionTabs } from "@/components/layout/section-tabs";

const tabs = [
  { href: "/participant", label: "Dashboard" },
  { href: "/participant/quizzes", label: "Quizzes" },
  { href: "/participant/results", label: "Results" },
  { href: "/participant/profile", label: "Profile" },
];

export default async function ParticipantLayout({ children }: LayoutProps<"/participant">) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "PARTICIPANT") redirect("/admin");

  return (
    <div className="flex flex-1 flex-col">
      <SectionTabs tabs={tabs} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
