"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type JobType = "Full-time" | "Part-time" | "Contract";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: JobType;
  postedDate: string;
  isActive: boolean;
};

const JOBS_KEY = "bs_jobs";
const SAVED_KEY = "bs_saved_jobs";

function loadJobs(): Job[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(JOBS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Job[];
  } catch {
    return [];
  }
}

function loadSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SAVED_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setJobs(loadJobs());
    setSavedIds(loadSavedIds());
  }, []);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold text-slate-900">Saved jobs</h1>
        <Link href="/jobs" className="text-xs text-blue-600 hover:underline">
          Back to all jobs
        </Link>
      </div>

      <section className="card p-4">
        {savedJobs.length === 0 ? (
          <p className="text-sm text-slate-500">
            You haven&apos;t saved any jobs yet. Go to the Jobs page and click
            &quot;Save&quot; on roles you like.
          </p>
        ) : (
          <div className="space-y-3">
            {savedJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-lg border border-slate-200 bg-white p-3 hover:border-blue-500 hover:bg-blue-50/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      {job.title}
                    </h2>
                    <p className="text-xs text-slate-600">{job.location}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="badge badge-blue">{job.type}</span>
                      <span className="badge text-[10px]">
                        Saved • Posted{" "}
                        {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="btn-primary px-3 py-1 text-xs"
                  >
                    View & Apply
                  </Link>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-slate-700">
                  {job.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
