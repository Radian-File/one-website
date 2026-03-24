import { createHash, timingSafeEqual } from "node:crypto";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function hashPassword(password: string): string {
  return sha256(password);
}

export function verifyPassword(password: string, passwordHash: string): boolean {
  const incoming = Buffer.from(sha256(password));
  const expected = Buffer.from(passwordHash);

  if (incoming.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(incoming, expected);
}
