import moment from "moment";
import { ConversationF } from "@/infraestructure/types/friends.types";

export const findConversation = (
conversations: ConversationF[] | undefined,
  userId: string | null,
  friendId: string
): ConversationF | undefined => {
  if (!conversations || !userId) return undefined;

  return conversations.find(
    (conv) =>
      (conv.emisor === userId && conv.receptor === friendId) ||
      (conv.receptor === userId && conv.emisor === friendId)
  );
};

export const getLastMessage = (conversation: ConversationF | undefined): string => {
  if (!conversation?.mensajes?.length) {
    return "Sin mensajes hasta el momento...";
  }

  const lastMessage = conversation.mensajes[conversation.mensajes.length - 1];
  return lastMessage?.mensajes || "Sin mensajes hasta el momento...";
};

export const getLastMessageTime = (conversation: ConversationF | undefined): string => {
  if (!conversation?.mensajes?.length) {
    return "";
  }

  const lastMessage = conversation.mensajes[conversation.mensajes.length - 1];
  return lastMessage?.hora ? moment(lastMessage.hora).fromNow() : "";
};
