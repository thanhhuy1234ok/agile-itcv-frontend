import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    skills: [{ type: String }],
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

export default mongoose.model("Subscriber", SubscriberSchema);
