import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
  emisor: mongoose.Types.ObjectId;
  receptor: mongoose.Types.ObjectId;
  mensajes?: any[];
  createdAt: Date;
}

const conversationSchema = new Schema<IConversation>({
  emisor: {
    type: Schema.Types.ObjectId,
    ref: "Clients",
    required: true,
  },
  receptor: {
    type: Schema.Types.ObjectId,
    ref: "Clients",
    required: true,
  },
  mensajes: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversations: Model<IConversation> =
  mongoose.models.Conversations ||
  mongoose.model<IConversation>("Conversations", conversationSchema);

export default Conversations;
