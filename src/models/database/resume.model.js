import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "REVIEWING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    history: [
      {
        status: { type: String, required: true },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          email: { type: String },
        },
      },
    ],
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

export default mongoose.model("Resume", ResumeSchema);
