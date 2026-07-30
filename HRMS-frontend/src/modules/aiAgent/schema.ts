export type TAiAgentSchema = {
  AskRagPayload: {
    question: string;
    sessionId: string;
    includeMemory: boolean;
    memoryTtlSeconds: number;
  };

  AskRagResponse: {
    success: boolean;
    data: {
      answer: string;
      confidence: number;
      sources: Array<{
        source: string;
        page?: number;
        chunk?: number;
      }>;
      followup_questions?: string[];
      memory: {
        sessionId: string;
        ttlSeconds: number;
      };
    };
  };
};
