import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation } from '@tanstack/react-query';
import { TCommonSchema } from '../core/schema';
import { AuthQueryKeysEnum } from './keys';
import { TAuthSchema } from './schema';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: TAuthSchema['LoginPayload']) => {
      const res = await axiosInstance.post<TAuthSchema['GetLoggedInResponse']>(
        endpoints.auth.login,
        payload
      );

      return res.data;
    },
  });
};

export const useForgotPassHook = () => {
  return useMutation({
    mutationKey: [AuthQueryKeysEnum.forgotPassword],
    mutationFn: async (payload: TAuthSchema['ForgotPassPayload']) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.auth.forgot,
        payload
      );

      return res?.data;
    },
  });
};

export const useForgotPassVerifyOtpHook = () => {
  return useMutation({
    mutationKey: [AuthQueryKeysEnum.forgotPasswordVerifyOtp],
    mutationFn: async (payload: TAuthSchema['ForgotPassVerifyOtpPayload']) => {
      const res = await axiosInstance.post<TAuthSchema['ForgotPassVerifyOtpResponse']>(
        endpoints.auth.forgotPasswordVerifyOtp,
        payload
      );

      return res?.data;
    },
  });
};

export const useResetPassHook = () => {
  return useMutation({
    mutationKey: [AuthQueryKeysEnum.resetPassword],
    mutationFn: async (payload: TAuthSchema['ResetPassPayload']) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.auth.reset,
        payload
      );

      return res?.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: [AuthQueryKeysEnum.logout],
    mutationFn: async () => {
      await axiosInstance.post(endpoints.auth.logout);
    },
  });
};

export const useGetUserProfile = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.get<TAuthSchema['GetProfileDetailsResponse']>(
        endpoints.auth.profileDetails
      );

      return res.data;
    },
    mutationKey: [AuthQueryKeysEnum.getUserProfile],
  });
};

export const useUserProfileUpdate = () => {
  return useMutation({
    mutationKey: [AuthQueryKeysEnum.updateProfile],
    mutationFn: async (payload: TAuthSchema['ProfileUpdatePayload']) => {
      const res = await axiosInstance.patch(endpoints.auth.updateProfileDetails, payload);
      return res?.data;
    },
  });
};

export const useChangePassHook = () => {
  return useMutation({
    mutationKey: [AuthQueryKeysEnum.changePassword],
    mutationFn: async (payload: TAuthSchema['ChangePasswordPayload']) => {
      const res = await axiosInstance.post(endpoints.auth.changePassword, payload);
      return res?.data;
    },
  });
};
