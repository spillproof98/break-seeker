import Badge from "../ui/Badge";

export default function JobCard({
  job,
  selected,
  saved,
  onSelect,
  onSave,
}: {
  job: any;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onSave: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border px-3 py-2 transition
      ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-transparent hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold">{job.title}</h3>
          <p className="text-xs text-slate-600">{job.location}</p>
          <div className="mt-1 flex gap-2">
            <Badge>{job.type}</Badge>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          className={`text-xs ${saved ? "text-blue-600" : "text-slate-500"}`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <p className="mt-1 line-clamp-2 text-xs text-slate-700">
        {job.description}
      </p>
    </article>
  );
}
