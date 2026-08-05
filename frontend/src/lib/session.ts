import "server-only";
import { cookies } from "next/headers";
import { decodeJwtPayload, isExpired, type SessionPayload } from "@/lib/jwt";

export type { SessionPayload };

const COOKIE_NAME = "quiz_session";

export async function getToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = await getToken();
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload || isExpired(payload)) return null;
  return payload;
}

export async function setSessionCookie(token: string): Promise<void> {
  const payload = decodeJwtPayload(token);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const maxAge = payload ? Math.max(payload.exp - nowSeconds, 0) : 60 * 60 * 24;

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
