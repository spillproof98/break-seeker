const ADMIN_KEY = "bs_admin_logged_in";
const ADMIN_PASSWORD = "admin";

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_KEY) === "true";
}

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_KEY);
}
