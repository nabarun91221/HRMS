import { axiosInstance } from "@/lib/axiosInstance";
import endpoints from "@/lib/endpoints";
import { useMutation } from "@tanstack/react-query";
import { AiAgentQueryKeysEnum } from "./keys";
import { TAiAgentSchema } from "./schema";

export const useAskAiAgent = () => {
  return useMutation({
    mutationKey: [AiAgentQueryKeysEnum.askRag],
    mutationFn: async (payload: TAiAgentSchema["AskRagPayload"]) => {
      const res = await axiosInstance.post<TAiAgentSchema["AskRagResponse"]>(
        endpoints.aiAgent.ask,
        payload
      );

      return res?.data;
    },
  });
};
