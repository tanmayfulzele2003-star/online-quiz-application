import type { Role } from "@/types/api";

export interface SessionPayload {
  email: string;
  role: Role;
  fullName: string;
  exp: number;
}

interface JwtClaims {
  sub: string;
  role: Role;
  fullName: string;
  exp: number;
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** Decodes JWT claims without verifying the signature — safe only for UI routing decisions. */
export function decodeJwtPayload(token: string): SessionPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const claims = JSON.parse(base64UrlDecode(parts[1])) as JwtClaims;
    return {
      email: claims.sub,
      role: claims.role,
      fullName: claims.fullName,
      exp: claims.exp,
    };
  } catch {
    return null;
  }
}

export function isExpired(payload: SessionPayload): boolean {
  return payload.exp * 1000 < Date.now();
}
