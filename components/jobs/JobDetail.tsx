import Badge from "../ui/Badge";
import Link from "next/link";

export default function JobDetail({ job }: { job: any }) {
  if (!job)
    return (
      <div className="card p-4 text-sm text-slate-500">
        Select a job to view details.
      </div>
    );

  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p className="text-sm text-slate-600">{job.location}</p>

      <div className="mt-2 flex gap-2">
        <Badge>{job.type}</Badge>
        <Badge color="gray">
          Posted {new Date(job.postedDate).toLocaleDateString()}
        </Badge>
      </div>

      <h3 className="mt-4 text-sm font-semibold">About the job</h3>
      <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">
        {job.description}
      </p>

      <Link
        href={`/jobs/${job.id}`}
        className="btn-primary mt-4 inline-block text-xs"
      >
        View & Apply
      </Link>
    </div>
  );
}
