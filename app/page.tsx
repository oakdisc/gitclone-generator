"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS } from "./utils/constants";
import Generate from "./generate";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
    if (!userId) {
      router.push("/welcome");
    }
  }, [router]);

  return <Generate />;
}
