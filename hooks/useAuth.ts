import {useRouter} from 'next/dist/client/router';
import {useEffect, useState} from 'react';
import {useSession, signIn} from 'next-auth/react';

export const useAuth = () => {
  const {data: session, status} = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      setAuthenticated(true);
    }
    if (!session && !loading && typeof window !== 'undefined') {
      // router.push('/api/auth/signin?redirectPath=details');
      signIn(undefined);
    }
  }, [session, router, loading, status]);

  return authenticated;
};
