"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const jobs = loadJobs();
    const found = jobs.find((j) => j.id === id) ?? null;
    setJob(found);
    setLoading(false);
  }, [id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // we just simulate an application
    console.log("Application submitted", {
      jobId: id,
      name,
      email,
      resume,
    });
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="card p-4">
        <div className="skeleton mb-3 h-5 w-1/3" />
        <div className="skeleton mb-2 h-4 w-1/4" />
        <div className="skeleton h-24 w-full" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">Job not found.</p>
        <button
          onClick={() => router.push("/jobs")}
          className="btn-secondary text-xs"
        >
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[3fr,2fr]">
      <section className="card p-4">
        <button
          onClick={() => router.back()}
          className="mb-3 text-xs text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold text-slate-900">{job.title}</h1>
        <p className="mt-1 text-sm text-slate-600">{job.location}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="badge badge-blue">{job.type}</span>
          <span className="badge text-[10px]">
            Posted {new Date(job.postedDate).toLocaleDateString()}
          </span>
        </div>
        <h2 className="mt-4 text-sm font-semibold text-slate-800">
          Job description
        </h2>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {job.description}
        </p>
      </section>

      <section className="card p-4">
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Apply for this job
        </h2>
        {submitted ? (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            Your application has been recorded (simulated). You can still update
            the form and submit again.
          </div>
        ) : (
          <p className="mb-2 text-xs text-slate-500">
            This is a simulated application. No actual email is sent.
          </p>
        )}

        <form onSubmit={handleApply} className="mt-3 space-y-3 text-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Name
            </label>
            <input
              className="input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Resume / Portfolio link
            </label>
            <input
              className="input"
              required
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <button type="submit" className="btn-primary mt-2 w-full">
            Submit application
          </button>
        </form>
      </section>
    </div>
  );
}
