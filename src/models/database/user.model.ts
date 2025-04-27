import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  address?: string;
  company?: {
    _id: mongoose.Types.ObjectId;
    name: string;
  };
  role: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  createdBy?: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };
  updatedBy?: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };
  deleteBy?: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    address: { type: String },
    company: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      name: { type: String },
    },
    role: { type: String, required: true },
    refreshToken: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      email: { type: String },
    },
    updatedBy: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      email: { type: String },
    },
    deleteBy: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      email: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
