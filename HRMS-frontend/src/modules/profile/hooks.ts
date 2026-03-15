import { axiosInstance } from "@/lib/axiosInstance";
import endpoints from "@/lib/endpoints";
import { useMutation } from "@tanstack/react-query";
import { ProfileQueryKeysEnum } from "./keys";
import { TProfileSchema } from "./schema";

export const useUploadEmployeeDocuments = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeysEnum.uploadDocument],
    mutationFn: (payload: TProfileSchema["UploadDocumentsPayload"]) => {
      return axiosInstance.put(endpoints.profile.uploadDocument, payload);
    },
  });
};
