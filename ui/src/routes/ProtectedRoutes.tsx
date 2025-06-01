'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    if (!checkingAuth && !authUser) {
      router.push('/login');
    }
  }, [authUser, checkingAuth, router]);

  if (checkingAuth || !authUser) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};