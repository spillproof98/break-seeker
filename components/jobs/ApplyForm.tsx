"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted && (
        <div className="rounded-lg bg-green-50 p-2 text-sm text-green-700">
          Application submitted (simulated).
        </div>
      )}

      <Input
        placeholder="Your Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Resume / Portfolio Link"
        required
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <Button className="w-full mt-2">Apply</Button>
    </form>
  );
}
