'use client';
import { useSession } from 'next-auth/react';
function useAuthInfo() {
  const { data: session } = useSession();
  return session?.user ? session?.user : null;
}

export default useAuthInfo;
