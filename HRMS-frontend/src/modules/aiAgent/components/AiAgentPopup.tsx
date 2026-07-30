"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Bot, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useAskAiAgent } from "../hooks";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  sources?: Array<{
    source: string;
    page?: number;
    chunk?: number;
  }>;
};

const createSessionId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `ai-session-${Date.now()}`;
};

export default function AiAgentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [sessionId, setSessionId] = useState(createSessionId);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Ask me anything from the HRMS knowledge base.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const askAiAgent = useAskAiAgent();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, askAiAgent.isPending, isOpen]);

  const canSubmit = useMemo(
    () => Boolean(question.trim()) && !askAiAgent.isPending && Boolean(sessionId),
    [askAiAgent.isPending, question, sessionId]
  );

  const handleReset = () => {
    setSessionId(createSessionId());
    setQuestion("");
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Conversation reset. What should we look up next?",
      },
    ]);
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || !sessionId) return;

    const userMessage: ChatMessage = {
      id: createSessionId(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages(previous => [...previous, userMessage]);
    setQuestion("");

    try {
      const response = await askAiAgent.mutateAsync({
        question: trimmedQuestion,
        sessionId,
        includeMemory: true,
        memoryTtlSeconds: 3600,
      });

      setMessages(previous => [
        ...previous,
        {
          id: createSessionId(),
          role: "assistant",
          content: response.data.answer,
          confidence: response.data.confidence,
          sources: response.data.sources,
        },
      ]);
    } catch {
      setMessages(previous => [
        ...previous,
        {
          id: createSessionId(),
          role: "assistant",
          content: "I could not complete that request. Please try again.",
        },
      ]);
      toast.error("AI agent request failed");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen && (
        <section className="pointer-events-auto bg-background text-foreground flex h-[min(640px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-lg border shadow-xl">
          <header className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-md">
                <Bot className="size-5" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">AI Agent</h2>
                <p className="text-muted-foreground truncate text-xs">HRMS knowledge assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={handleReset}
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RotateCcw className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI agent"
                title="Close"
              >
                <X className="size-4" />
              </Button>
            </div>
          </header>

          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-3 p-4">
              {messages.map(message => (
                <article
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[86%] rounded-lg px-3 py-2 text-sm leading-6",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    {message.role === "assistant" && Boolean(message.sources?.length) && (
                      <div className="mt-2 space-y-1 border-t pt-2 text-xs">
                        <p className="font-medium">Sources</p>
                        {message.sources?.slice(0, 3).map((source, index) => (
                          <p key={`${source.source}-${index}`} className="text-muted-foreground break-words">
                            {source.source}
                            {typeof source.page === "number" ? `, page ${source.page}` : ""}
                          </p>
                        ))}
                      </div>
                    )}
                    {typeof message.confidence === "number" && (
                      <p className="text-muted-foreground mt-2 text-xs">
                        Confidence {Math.round(message.confidence * 100)}%
                      </p>
                    )}
                  </div>
                </article>
              ))}
              {askAiAgent.isPending && (
                <div className="flex justify-start">
                  <div className="bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
                    <Spinner className="size-4" />
                    Thinking
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <form className="border-t p-3" onSubmit={handleSubmit}>
            <div className="flex items-end gap-2">
              <Textarea
                value={question}
                onChange={event => setQuestion(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about HR policies, payroll, leave, or documents"
                className="max-h-32 min-h-11 resize-none"
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!canSubmit}
                aria-label="Send message"
                title="Send"
              >
                {askAiAgent.isPending ? <Spinner className="size-4" /> : <Send className="size-4" />}
              </Button>
            </div>
          </form>
        </section>
      )}

      <Button
        type="button"
        size="icon-lg"
        className="pointer-events-auto size-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(previous => !previous)}
        aria-label={isOpen ? "Close AI agent" : "Open AI agent"}
        title={isOpen ? "Close AI agent" : "Open AI agent"}
      >
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </div>
  );
}
