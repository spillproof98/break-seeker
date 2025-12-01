"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
const ADMIN_KEY = "bs_admin_logged_in";

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

function saveJobs(jobs: Job[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loggedIn = window.localStorage.getItem(ADMIN_KEY) === "true";
    if (!loggedIn) {
      router.replace("/admin");
      return;
    }
    setJobs(loadJobs());
  }, [router]);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this job?")) return;
    const next = jobs.filter((j) => j.id !== id);
    setJobs(next);
    saveJobs(next);
  };

  const toggleActive = (id: string) => {
    const next = jobs.map((j) =>
      j.id === id ? { ...j, isActive: !j.isActive } : j
    );
    setJobs(next);
    saveJobs(next);
  };

  const signOut = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_KEY);
    }
    router.replace("/admin");
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Admin dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Manage job postings for Break Seekers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/admin/dashboard/create")}
            className="btn-primary text-xs"
          >
            + New job
          </button>
          <button onClick={signOut} className="btn-secondary text-xs">
            Sign out
          </button>
        </div>
      </header>

      <section className="card p-4">
        {jobs.length === 0 ? (
          <p className="text-sm text-slate-500">
            No jobs yet. Create your first job posting.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-2 py-2">Title</th>
                  <th className="px-2 py-2">Location</th>
                  <th className="px-2 py-2">Type</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Posted</th>
                  <th className="px-2 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-100 text-[11px]"
                  >
                    <td className="px-2 py-2 font-medium text-slate-900">
                      {job.title}
                    </td>
                    <td className="px-2 py-2 text-slate-600">
                      {job.location}
                    </td>
                    <td className="px-2 py-2 text-slate-600">{job.type}</td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => toggleActive(job.id)}
                        className={`badge ${
                          job.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {job.isActive ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-2 py-2 text-slate-500">
                      {job.postedDate
                        ? new Date(job.postedDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-2 py-2 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/dashboard/edit/${job.id}`)
                          }
                          className="text-[11px] font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-[11px] font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => router.push(`/jobs/${job.id}`)}
                          className="text-[11px] font-medium text-slate-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
