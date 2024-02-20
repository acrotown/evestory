"use client";

import { useParams } from "next/navigation";

export default function Index() {
  let params = useParams();
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}
