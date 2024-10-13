import mongoose from "mongoose";

export const conversationSchema = new mongoose.Schema({
    emisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        required: true
    },
    receptor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        required: true
    },
    mensajes: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Conversations || mongoose.model("Conversations", conversationSchema)