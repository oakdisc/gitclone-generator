"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from './utils/constants';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
    if (!userId) {
      router.push('/welcome');
    }
  }, [router]);

  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/welcome">Go to Welcome Page</Link>
    </div>
  );
}
