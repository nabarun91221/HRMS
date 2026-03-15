import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation } from '@tanstack/react-query';
import { TFileSchema } from './schema';

export const useUploadFile = () => {
  return useMutation({
    mutationKey: ['file-upload'],
    mutationFn: async (payload: TFileSchema['uploadPayload']) => {
      const res = await axiosInstance.postForm<TFileSchema['uploadResponse']>(
        endpoints.fileHandle.upload,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationKey: ['file-delete'],
    mutationFn: async (publicId: string) => {
      const res = await axiosInstance.delete(endpoints.fileHandle.delete, {
        data: { publicId },
      });
      return res?.data?.data;
    },
  });
};
