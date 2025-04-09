export const SESSION_KEY = "session";

export function isSessionValid(): boolean {
  const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  if (!session) return false;
  const now = new Date().getTime();
  const sessionDuration = 1000 * 60 * 15;
  return now - session.timestamp < sessionDuration;
}

export function saveSession(email: string) {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, timestamp: new Date().getTime() })
  );
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
