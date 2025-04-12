
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  context?: string; // Track what context the message was related to
}

export interface AIStats {
  messagesCount: number;
  topTopics: string[];
  lastInteraction: Date | null;
  helpfulResponses: number;
}

export interface TrainingData {
  question: string;
  answer: string;
  category: string;
}
