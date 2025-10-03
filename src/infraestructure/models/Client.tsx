import mongoose, { Document, Model, Schema } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  password?: string;
  imagenPerfil?: string;
  createdAt: Date;
}

const clientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
  },

  imagenPerfil: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Clients: Model<IClient> =
  mongoose.models.Clients || mongoose.model<IClient>("Clients", clientSchema);

export default Clients;
