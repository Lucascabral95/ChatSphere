import mongoose from "mongoose";

class Database {
  private static instance: Database;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<typeof mongoose> {
    if (this.connection) {
      return this.connection;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI no está definida");
    }

    try {
      this.connection = await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      return this.connection;
    } catch (error) {
      console.error("❌ Error al conectar a MongoDB:", error);
      throw error;
    }
  }
}

export const connectDB = async () => {
  const db = Database.getInstance();
  return db.connect();
};

export default connectDB;
