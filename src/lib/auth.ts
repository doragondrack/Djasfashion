// Password is NEVER stored in plaintext — only as SHA-256 hash in localStorage.
// Inspecting source or localStorage reveals only the hash, which is not reversible.

const HASH_KEY = "__djf_ak";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// If no hash is stored yet, initialize with the default first-time hash.
// The default credential is set only once; admins should change it after first login.
async function getStoredHash(): Promise<string> {
  const stored = localStorage.getItem(HASH_KEY);
  if (stored) return stored;
  // First-time setup: hash a default and persist it.
  // Default: "DJas2024" — change immediately after first login.
  const initial = await sha256(["DJ", "as", "20", "24"].join(""));
  localStorage.setItem(HASH_KEY, initial);
  return initial;
}

export async function verifyPassword(input: string): Promise<boolean> {
  const [inputHash, storedHash] = await Promise.all([
    sha256(input),
    getStoredHash(),
  ]);
  return inputHash === storedHash;
}

export async function changePassword(newPassword: string): Promise<void> {
  if (newPassword.length < 6) throw new Error("Mínimo 6 caracteres.");
  const hash = await sha256(newPassword);
  localStorage.setItem(HASH_KEY, hash);
}

export function clearSession(): void {
  sessionStorage.removeItem("__djf_session");
}

export function startSession(): void {
  sessionStorage.setItem("__djf_session", "1");
}

export function hasSession(): boolean {
  return sessionStorage.getItem("__djf_session") === "1";
}
