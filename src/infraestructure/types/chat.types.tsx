export interface ChatUser {
  _id: string;
  email: string;
  name: string;
  imagenPerfil?: string | null;
}

export interface ChatMessage {
  mensajes: string;
  emisor: string;
  hora: string;
}

export interface Conversation {
  _id: string;
  emisor: string;
  receptor: string;
  mensajes: ChatMessage[];
}

export interface ConversationResponse {
  mensajeria: Conversation[];
}
