"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type JobType = "Full-time" | "Part-time" | "Contract";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: JobType;
  postedDate: string; // ISO
  isActive: boolean;
};

const JOBS_KEY = "bs_jobs";
const SAVED_KEY = "bs_saved_jobs";

const defaultJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer (React / Next.js)",
    description:
      "Build and ship modern, responsive UIs for our job discovery platform. Work closely with design and product.",
    location: "Bengaluru, India · Hybrid",
    type: "Full-time",
    postedDate: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "2",
    title: "Junior Full Stack Developer",
    description:
      "Help build internal tools using React, Node.js and REST APIs. Great for developers starting their career.",
    location: "Remote · India",
    type: "Contract",
    postedDate: new Date().toISOString(),
    isActive: true,
  },
];

function loadJobs(): Job[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(JOBS_KEY);
  if (!raw) return defaultJobs;
  try {
    const parsed = JSON.parse(raw) as Job[];
    return parsed.length ? parsed : defaultJobs;
  } catch {
    return defaultJobs;
  }
}

function saveJobs(jobs: Job[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

function loadSaved(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SAVED_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function saveSaved(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<JobType | "All">("All");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const j = loadJobs();
    setJobs(j);
    const saved = loadSaved();
    setSavedIds(saved);
    if (j.length && !selectedId) setSelectedId(j[0].id);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!job.isActive) return false;

      const searchText = (job.title + job.description).toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" ? true : job.type === typeFilter;

      const matchesLocation = locationFilter
        ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, search, typeFilter, locationFilter]);

  const selectedJob =
    filteredJobs.find((j) => j.id === selectedId) ?? filteredJobs[0] ?? null;

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      saveSaved(next);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="card card-hover flex flex-col gap-3 p-3 md:flex-row md:items-center">
        <input
          className="input md:flex-1"
          placeholder="Search by job title or keywords"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select md:w-44"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as JobType | "All")}
        >
          <option value="All">All types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <input
          className="input md:w-60"
          placeholder="Location (e.g. Bengaluru, Remote)"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
        {/* Left: job list */}
        <section className="card p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">
              Jobs ({filteredJobs.length})
            </h2>
            <Link
              href="/jobs/saved"
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              View saved
            </Link>
          </div>
          <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
            {filteredJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              const isSaved = savedIds.includes(job.id);
              return (
                <article
                  key={job.id}
                  onClick={() => setSelectedId(job.id)}
                  className={`cursor-pointer rounded-lg border px-3 py-2 transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/60"
                      : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-600">{job.location}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="badge badge-blue">{job.type}</span>
                        <span className="badge text-[10px]">
                          Posted{" "}
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(job.id);
                      }}
                      className={`text-xs font-medium ${
                        isSaved ? "text-blue-600" : "text-slate-500"
                      } hover:text-blue-600`}
                    >
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-700">
                    {job.description}
                  </p>
                </article>
              );
            })}
            {!filteredJobs.length && (
              <p className="py-4 text-center text-xs text-slate-500">
                No jobs match these filters.
              </p>
            )}
          </div>
        </section>

        {/* Right: selected job detail */}
        <section className="card p-4">
          {selectedJob ? (
            <>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {selectedJob.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {selectedJob.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="badge badge-blue">{selectedJob.type}</span>
                    <span className="badge text-[10px]">
                      Posted{" "}
                      {new Date(
                        selectedJob.postedDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/jobs/${selectedJob.id}`}
                  className="btn-primary text-xs"
                >
                  View & Apply
                </Link>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">
                About the job
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {selectedJob.description}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Select a job on the left to see details.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
