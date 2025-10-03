import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICharlaPrueba extends Document {
  emisor?: string;
  receptor?: string;
  mensaje?: string;
  createdAt: Date;
}

const charlaPruebaSchema = new Schema<ICharlaPrueba>({
  emisor: {
    type: String,
  },

  receptor: {
    type: String,
  },

  mensaje: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CharlaPrueba: Model<ICharlaPrueba> =
  mongoose.models.CharlaPrueba || mongoose.model<ICharlaPrueba>("CharlaPrueba", charlaPruebaSchema);

export default CharlaPrueba;
