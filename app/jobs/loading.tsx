export default function JobsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
      <div className="space-y-3">
        <div className="skeleton h-10 w-full" />
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-3 w-2/3" />
        </div>
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <div className="skeleton h-5 w-1/2" />
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-3 w-1/4" />
        <div className="skeleton h-24 w-full" />
      </div>
    </div>
  );
}
