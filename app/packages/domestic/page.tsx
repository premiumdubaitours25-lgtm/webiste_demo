'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DomesticPackagesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/packages');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to packages...</p>
      </div>
    </div>
  );
}
