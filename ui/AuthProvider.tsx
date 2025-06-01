'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader } from 'lucide-react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialize = useAuthStore((state) => state.initialize);
  const checkingAuth = useAuthStore((state) => state.checkingAuth);
    console.log(initialize, checkingAuth);
  useEffect(() => {
    initialize();
  }, [initialize]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
