import { Job, JobType } from "../types";

export function filterJobs(
  jobs: Job[],
  search: string,
  type: JobType | "All",
  location: string
): Job[] {
  const s = search.toLowerCase();
  const l = location.toLowerCase();

  return jobs.filter((job) => {
    if (!job.isActive) return false;

    const matchesSearch =
      !s ||
      job.title.toLowerCase().includes(s) ||
      job.description.toLowerCase().includes(s);

    const matchesType = type === "All" ? true : job.type === type;

    const matchesLocation = !l
      ? true
      : job.location.toLowerCase().includes(l);

    return matchesSearch && matchesType && matchesLocation;
  });
}

export function createJobId(): string {
  return Date.now().toString() + "-" + Math.random().toString(16).slice(2);
}
