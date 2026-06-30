"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  return <button onClick={() => router.push("/dashboard/31232")}>Click</button>;
}
