import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    UID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
        unique: true, 
        required: true
    }],
    friends: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Users || mongoose.model("Users", userSchema)