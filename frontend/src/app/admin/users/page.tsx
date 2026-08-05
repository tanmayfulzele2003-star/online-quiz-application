import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import type { UserDto } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Users",
};

export default async function AdminUsersPage() {
  const users = await apiFetch<UserDto[]>("/api/admin/users");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Registered users</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everyone with a QuizNest account.</p>
      </div>

      {users.length === 0 ? (
        <EmptyState title="No users yet" />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-5 py-3 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-3 font-medium">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-medium text-foreground">{user.fullName}</td>
                      <td className="px-5 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-5 py-3">
                        <Badge tone={user.role === "ADMIN" ? "primary" : "muted"}>
                          {user.role}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
