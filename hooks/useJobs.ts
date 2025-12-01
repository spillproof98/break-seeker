"use client";

import { useEffect, useState } from "react";
import { Job, JobType } from "@/lib/types";
import { loadJobs, saveJobs } from "@/lib/storage/jobsStorage";
import { createJobId } from "@/lib/utils/helpers";
import { jobSchema, JobFormValues } from "@/lib/validation/jobSchema";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const j = loadJobs();
    setJobs(j);
    setLoaded(true);
  }, []);

  const createJob = (data: JobFormValues) => {
    const parsed = jobSchema.safeParse(data);
    if (!parsed.success) {
      throw parsed.error;
    }

    const newJob: Job = {
      id: createJobId(),
      title: parsed.data.title,
      description: parsed.data.description,
      location: parsed.data.location,
      type: parsed.data.type as JobType,
      postedDate: new Date().toISOString(),
      isActive: parsed.data.isActive,
    };

    const next = [newJob, ...jobs];
    setJobs(next);
    saveJobs(next);
    return newJob;
  };

  const updateJobById = (id: string, data: Partial<JobFormValues>) => {
    const next = jobs.map((job) =>
      job.id === id ? { ...job, ...data } : job
    );
    setJobs(next);
    saveJobs(next);
  };

  const deleteJobById = (id: string) => {
    const next = jobs.filter((job) => job.id !== id);
    setJobs(next);
    saveJobs(next);
  };

  const getJobById = (id: string) => {
    return jobs.find((j) => j.id === id) ?? null;
  };

  return {
    jobs,
    loaded,
    createJob,
    updateJobById,
    deleteJobById,
    getJobById,
  };
}
