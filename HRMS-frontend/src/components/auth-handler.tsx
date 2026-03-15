'use client';

import { ROUTES } from '@/lib/routes';
import { useGetUserProfile, useLogout } from '@/modules/auth/hooks';

import { TAuthSchema, UserRoleEnum } from '@/modules/auth/schema';
import { useQueryClient } from '@tanstack/react-query';
// import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useEffectEvent, useState } from 'react';
import Loading from './Loading';

type TAuthContext = {
  isLoggedIn: boolean;
  loggedInUser: TAuthSchema['ProfileResponse'];
  setLoggedInUser: (user: TAuthSchema['ProfileResponse']) => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext>({
  isLoggedIn: false,
  loggedInUser: {} as TAuthSchema['ProfileResponse'],
  setLoggedInUser: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthHandler = ({ children }: { children: React.ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { mutate: getUserProfile, isPending } = useGetUserProfile();

  const router = useRouter();

  const [loggedInUser, setLoggedInUser] = useState<TAuthContext['loggedInUser']>();

  const setLoadingEffect = useEffectEvent((value: boolean) => {
    setInitialLoading(value);
  });

  useEffect(() => {
    // if (!Cookies.get(accessTokenName)) {
    //   setLoadingEffect(false);
    //   return;
    // }

    getUserProfile(undefined, {
      onSuccess: res => {
        setLoggedInUser(res?.data?.user);
      },
      onError: () => {
        const pathname = window?.location?.pathname;
        if (pathname !== ROUTES.auth.login) {
          // Cookies.remove(accessTokenName);
          // Cookies.remove(refreshTokenName);

          router.push(ROUTES.auth.login);
        }
      },
      onSettled: () => {
        setLoadingEffect(false);
      },
    });
  }, [getUserProfile, router]);

  useEffect(() => {
    if (isPending) return;
    const pathname = window?.location?.pathname;

    if (loggedInUser) {
      if (pathname === ROUTES.auth.login) {
        if (loggedInUser?.role === UserRoleEnum.COMPANY_ADMIN)
          router.push(ROUTES.admin.dashboard.home);
        else router.push(ROUTES.employee.dashboard.home);
      }
    }
  }, [loggedInUser, isPending, router]);

  const queryClient = useQueryClient();
  const { mutate: logoutUser } = useLogout();
  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        queryClient.clear();
        // Cookies.remove(accessTokenName);
        // Cookies.remove(refreshTokenName);

        router.push(ROUTES.auth.login);
        setLoggedInUser(undefined);
      },
    });
  };

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <AuthContext
      value={{
        isLoggedIn: !!loggedInUser,
        loggedInUser: loggedInUser as TAuthSchema['ProfileResponse'],
        setLoggedInUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext>
  );
};
