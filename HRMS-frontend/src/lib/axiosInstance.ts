import { TCommonSchema } from '@/modules/core/schema';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import endpoints, { baseUrlApi } from './endpoints';

export const axiosInstance = axios.create({
  baseURL: baseUrlApi,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   config => {
//     const token = Cookies.get(accessTokenName);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  res => res,
  async (error: AxiosError<TCommonSchema['BaseApiErrorResponse']>) => {
    if (!error.config) {
      return Promise.reject(error);
    }
    // const originalRequest = error.config as InternalAxiosRequestConfig & {
    //   _retry?: boolean;
    // };

    const { response } = error;

    // if (
    //   error.response?.status === 401 &&
    //   !originalRequest._retry &&
    //   error.config.url !== endpoints.auth.refresh
    // ) {
    //   originalRequest._retry = true;
    //   const tokens = await refreshToken();

    //   if (!tokens) {
    //     Cookies.remove(accessTokenName);
    //     Cookies.remove(refreshTokenName);

    //     const message = response?.data?.message || 'Something went wrong';
    //     toast.error(message);
    //     // window.location.href = '/';
    //     return Promise.reject(error);
    //   }

    //   Cookies.set(accessTokenName, tokens.accessToken, {
    //     sameSite: 'strict',
    //     secure: process.env.NODE_ENV === 'production',
    //     expires: 1,
    //   });
    //   Cookies.set(refreshTokenName, tokens.refreshToken, {
    //     sameSite: 'strict',
    //     secure: process.env.NODE_ENV === 'production',
    //     expires: 7,
    //   });

    //   originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    //   return axiosInstance(originalRequest);
    // }

    const message = response?.data?.message || 'Something went wrong';

    if (error.config.url !== endpoints.auth.profileDetails) toast.error(message);
    return Promise.reject(error);
  }
);

// const refreshToken = async () => {
//   try {
//     const accessToken = Cookies.get(accessTokenName);
//     const refreshToken = Cookies.get(refreshTokenName);
//     if (!refreshToken || !accessToken) {
//       Cookies.remove(accessTokenName);
//       Cookies.remove(refreshTokenName);

//       return null;
//     }
//     const res = await axios.post<TAuthSchema['TokenRefreshResponse']>(
//       `${baseUrlApi}${endpoints.auth.refresh}`,
//       undefined,
//       {
//         headers: {
//           Authorization: `Bearer ${refreshToken}`,
//         },
//       }
//     );
//     const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res?.data?.data;

//     if (accessToken && refreshToken) {
//       return {
//         accessToken: newAccessToken,
//         refreshToken: newRefreshToken,
//       };
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// };
