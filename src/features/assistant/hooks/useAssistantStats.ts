
import { useState, useEffect } from "react";
import { Message, AIStats } from "../types";

export const useAssistantStats = () => {
  const [stats, setStats] = useState<AIStats>({
    messagesCount: 0,
    topTopics: [],
    lastInteraction: null,
    helpfulResponses: 0
  });

  // Load stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem("vendeai_assistant_stats");
    const savedMessages = localStorage.getItem("vendeai_assistant_history");
    
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error("Error parsing saved stats:", error);
        // Initialize with default stats
        updateStats([]);
      }
    } else {
      // Initialize stats based on existing messages
      updateStats(savedMessages ? JSON.parse(savedMessages) : []);
    }
  }, []);
  
  // Update assistant stats
  const updateStats = (currentMessages: Message[]) => {
    // Count messages
    const userMessages = currentMessages.filter(msg => msg.role === "user");
    
    // Track topics from context field
    const topics = userMessages
      .map(msg => msg.context || "geral")
      .reduce((acc: Record<string, number>, topic) => {
        acc[topic] = (acc[topic] || 0) + 1;
        return acc;
      }, {});
    
    // Get top 3 topics
    const topTopics = Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic]) => topic);
      
    // Last interaction time
    const lastMessage = currentMessages[currentMessages.length - 1];
    const lastInteraction = lastMessage ? new Date(lastMessage.timestamp) : null;
    
    // Helpful responses (simplified for demo - could be based on user feedback)
    const helpfulResponses = Math.floor(userMessages.length * 0.8); // Assume 80% were helpful
    
    const newStats: AIStats = {
      messagesCount: userMessages.length,
      topTopics,
      lastInteraction,
      helpfulResponses
    };
    
    setStats(newStats);
    localStorage.setItem("vendeai_assistant_stats", JSON.stringify(newStats));
  };

  return {
    stats,
    updateStats
  };
};
