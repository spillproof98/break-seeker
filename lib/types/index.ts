export type JobType = "Full-time" | "Part-time" | "Contract";

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: JobType;
  postedDate: string; // ISO date
  isActive: boolean;
}

export interface JobApplication {
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  submittedAt: string; // ISO date
}
