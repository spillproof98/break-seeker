const SAVED_KEY = "bs_saved_jobs";

export function loadSavedJobs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveSavedJobs(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}

export function toggleSavedJob(id: string): string[] {
  const saved = loadSavedJobs();
  const exists = saved.includes(id);
  const next = exists ? saved.filter((x) => x !== id) : [...saved, id];
  saveSavedJobs(next);
  return next;
}
