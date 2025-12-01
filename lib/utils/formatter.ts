import { JobType } from "../types";

export function formatJobType(type: JobType): string {
  return type;
}

export function truncate(text: string, max = 120): string {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max) + "…";
}
