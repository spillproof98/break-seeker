"use client";

import { useEffect, useState } from "react";
import {
  loadSavedJobs,
  saveSavedJobs,
  toggleSavedJob,
} from "@/lib/storage/savedJobsStorage";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ids = loadSavedJobs();
    setSavedIds(ids);
    setLoaded(true);
  }, []);

  const toggle = (id: string) => {
    const next = toggleSavedJob(id);
    setSavedIds(next);
  };

  const clearSaved = () => {
    saveSavedJobs([]);
    setSavedIds([]);
  };

  return {
    savedIds,
    loaded,
    toggle,
    clearSaved,
  };
}
