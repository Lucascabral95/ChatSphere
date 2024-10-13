import mongoose from "mongoose";

export const charlaPruebaSchema = new mongoose.Schema({
    emisor: {
        type: String
    },
    receptor: {
        type: String
    },
    mensaje: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.CharlaPrueba || mongoose.model("CharlaPrueba", charlaPruebaSchema);