import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "DELETE"],
    },
    description: { type: String },
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

export default mongoose.model("Permission", PermissionSchema);
