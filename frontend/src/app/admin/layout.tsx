import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SectionTabs } from "@/components/layout/section-tabs";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/quizzes", label: "Quizzes" },
  { href: "/admin/users", label: "Users" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/participant");

  return (
    <div className="flex flex-1 flex-col">
      <SectionTabs tabs={tabs} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
