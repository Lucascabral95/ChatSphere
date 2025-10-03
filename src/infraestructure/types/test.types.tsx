export interface TestMessage {
  emisor: string;
  mensaje: string;
  createdAt?: string;
}

export interface TestConversationResponse {
  charlas: TestMessage[];
}
