"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Blog5Main() {
  const router = useRouter();

  // Go directly to the first screen
  useEffect(() => {
    router.replace("/blogs/blog5/LanguageSelector");
  }, [router]);

  return <p className="p-10 text-center">Loading Action Stories...</p>;
}
