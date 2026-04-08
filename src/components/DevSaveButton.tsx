"use client";

import { useState } from "react";
import { getRegistry } from "./DevDraggable";

export default function DevSaveButton() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  if (process.env.NODE_ENV !== "development") return null;

  const handleSave = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/dev/save-positions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getRegistry()),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const label = {
    idle: "Save Positions",
    saving: "Saving...",
    saved: "Saved!",
    error: "Error!",
  }[status];

  const bg = {
    idle: "rgba(255,100,200,0.9)",
    saving: "rgba(255,200,50,0.9)",
    saved: "rgba(100,220,100,0.9)",
    error: "rgba(220,50,50,0.9)",
  }[status];

  return (
    <button
      onClick={handleSave}
      disabled={status === "saving"}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 99999,
        background: bg,
        color: "#000",
        border: "none",
        borderRadius: 8,
        padding: "8px 16px",
        fontSize: 13,
        fontFamily: "monospace",
        fontWeight: 600,
        cursor: status === "saving" ? "wait" : "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {label}
    </button>
  );
}
