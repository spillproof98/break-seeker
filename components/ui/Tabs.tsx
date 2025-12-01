export default function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 border-b p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1 text-sm transition 
          ${
            active === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-blue-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
