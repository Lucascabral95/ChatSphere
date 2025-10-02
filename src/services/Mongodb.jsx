import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected: ", db.connection.name);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
