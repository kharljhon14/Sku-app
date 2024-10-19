'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();

  if (status === 'authenticated') {
    console.log(data.user?.email);
  }

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
