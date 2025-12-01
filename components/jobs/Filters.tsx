import Input from "../ui/Input";
import Select from "../ui/Select";

export default function Filters({
  search,
  setSearch,
  type,
  setType,
  location,
  setLocation,
}: {
  search: string;
  setSearch: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
}) {
  return (
    <div className="card flex flex-col gap-3 p-3 md:flex-row">
      <Input
        placeholder="Search job title or keywords"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="All">All types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </Select>
      <Input
        placeholder="Location (e.g. Bengaluru, Remote)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
}
