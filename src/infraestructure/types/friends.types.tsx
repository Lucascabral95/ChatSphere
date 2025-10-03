export interface Friend {
  id: string;
  name: string;
  email: string;
  imagen?: string | null;
}

export interface Message {
  mensajes: string;
  hora: string;
  emisor: string;
}

export interface ConversationF {
  emisor: string;
  receptor: string;
  mensajes: Message[];
}

export interface FriendsData {
  datosAmigos: Friend[];
  conversaciones: ConversationF[];
}
