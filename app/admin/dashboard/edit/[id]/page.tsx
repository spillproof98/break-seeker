"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loaded, setLoaded] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<JobType>("Full-time");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const jobs = loadJobs();
    const found = jobs.find((j) => j.id === id) ?? null;
    if (!found) {
      setLoaded(true);
      setJob(null);
      return;
    }
    setJob(found);
    setTitle(found.title);
    setLocation(found.location);
    setType(found.type);
    setDescription(found.description);
    setIsActive(found.isActive);
    setLoaded(true);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) {
      setError("Title, location and description are required.");
      return;
    }
    const jobs = loadJobs();
    const next = jobs.map((j) =>
      j.id === id
        ? {
            ...j,
            title: title.trim(),
            location: location.trim(),
            description: description.trim(),
            type,
            isActive,
          }
        : j
    );
    saveJobs(next);
    router.replace("/admin/dashboard");
  };

  if (!loaded) {
    return (
      <div className="card max-w-xl p-4">
        <div className="skeleton h-5 w-1/3" />
        <div className="mt-2 space-y-2">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">Job not found.</p>
        <button
          onClick={() => router.replace("/admin/dashboard")}
          className="btn-secondary text-xs"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

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
          Edit job posting
        </h1>
        <p className="text-xs text-slate-500">
          Update details and visibility for this role.
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
              Save changes
            </button>
            <button
              type="button"
              onClick={() => router.replace("/admin/dashboard")}
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
