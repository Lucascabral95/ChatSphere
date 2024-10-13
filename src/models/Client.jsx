import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    }, 
    imagenPerfil: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Clients || mongoose.model("Clients", clientSchema)