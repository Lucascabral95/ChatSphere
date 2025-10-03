import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email?: string;
  UID: mongoose.Types.ObjectId[];
  friends?: any[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String },

  UID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      unique: true,
      required: true,
    },
  ],

  friends: { type: Array },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users: Model<IUser> = mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);

export default Users;
