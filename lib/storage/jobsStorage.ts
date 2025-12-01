import { Job } from "../types";

const JOBS_KEY = "bs_jobs";

export function loadJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOBS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Job[];
  } catch {
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function addJob(job: Job) {
  const jobs = loadJobs();
  const next = [job, ...jobs];
  saveJobs(next);
  return next;
}

export function updateJob(id: string, updated: Partial<Job>) {
  const jobs = loadJobs().map((job) =>
    job.id === id ? { ...job, ...updated } : job
  );
  saveJobs(jobs);
  return jobs;
}

export function deleteJob(id: string) {
  const jobs = loadJobs().filter((job) => job.id !== id);
  saveJobs(jobs);
  return jobs;
}
