import { useState, useEffect } from "react";
import axios from "axios";

import { ChatMessage, ConversationResponse } from "@/infraestructure/types/chat.types";
import { pusherClient } from "@/infraestructure/services/pusher";

interface UseChatConversationProps {
  chatId: string;
  trigger: number;
}

export const useChatConversation = ({ chatId, trigger }: UseChatConversationProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const { data } = await axios.get<ConversationResponse>("/api/mensajes", {
          params: { id: chatId },
        });

        if (data.mensajeria?.[0]) {
          setMessages(data.mensajeria[0].mensajes.reverse());
          setConversationId(data.mensajeria[0]._id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener conversación:", error);
        setLoading(false);
      }
    };

    if (chatId) {
      fetchConversation();
    }
  }, [chatId, trigger]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = pusherClient.subscribe(conversationId);

    channel.bind("nuevo-mensaje", (newMessage: ChatMessage) => {
      setMessages((prev) => [newMessage, ...prev]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [conversationId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        setLoading(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [messages]);

  return { messages, loading, conversationId };
};
