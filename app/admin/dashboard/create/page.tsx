"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<JobType>("Full-time");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) {
      setError("Title, location and description are required.");
      return;
    }
    const jobs = loadJobs();
    const newJob: Job = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      type,
      postedDate: new Date().toISOString(),
      isActive,
    };
    const next = [newJob, ...jobs];
    saveJobs(next);
    router.replace("/admin/dashboard");
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => router.back()}
        className="text-xs text-blue-600 hover:underline"
      >
        ← Back to dashboard
      </button>

      <div className="card max-w-xl p-4">
        <h1 className="text-lg font-semibold text-slate-900">
          Create new job
        </h1>
        <p className="text-xs text-slate-500">
          This is fully client-side using localStorage.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 text-sm"
          noValidate
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Job title *
            </label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Junior React Developer"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Location *
            </label>
            <input
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bengaluru, India · Remote"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Type
            </label>
            <select
              className="select"
              value={type}
              onChange={(e) => setType(e.target.value as JobType)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Description *
            </label>
            <textarea
              className="input min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe responsibilities, requirements, and what makes this role interesting."
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active (visible on public jobs page)
          </label>
          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-2 pt-2">
            <button type="submit" className="btn-primary">
              Create job
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
