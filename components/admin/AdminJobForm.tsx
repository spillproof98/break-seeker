import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

export default function AdminJobForm({
  title,
  setTitle,
  location,
  setLocation,
  type,
  setType,
  description,
  setDescription,
  isActive,
  setIsActive,
  onSubmit,
  submitLabel = "Save",
}: {
  title: string;
  setTitle: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  return (
    <div className="space-y-3">
      <Input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </Select>

      <textarea
        className="input min-h-[120px]"
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>

      <Button className="w-full" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
}
