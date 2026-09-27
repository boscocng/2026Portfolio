"use client";

import LiveCount from "./LiveCount";
import { heroUsersAt } from "./liveCounts";

export default function ServeCount() {
  return (
    <span className="whitespace-nowrap">
      <LiveCount countAt={heroUsersAt} /> users.
    </span>
  );
}
