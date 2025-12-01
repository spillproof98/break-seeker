import JobCard from "./JobCard";

export default function JobList({
  jobs,
  selectedId,
  savedIds,
  setSelectedId,
  toggleSave,
}: {
  jobs: any[];
  selectedId: string | null;
  savedIds: string[];
  setSelectedId: (id: string) => void;
  toggleSave: (id: string) => void;
}) {
  return (
    <div className="card max-h-[520px] overflow-y-auto p-3 space-y-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          selected={job.id === selectedId}
          saved={savedIds.includes(job.id)}
          onSelect={() => setSelectedId(job.id)}
          onSave={() => toggleSave(job.id)}
        />
      ))}
      {jobs.length === 0 && (
        <p className="text-center text-xs text-slate-500 py-4">
          No jobs match filters.
        </p>
      )}
    </div>
  );
}
