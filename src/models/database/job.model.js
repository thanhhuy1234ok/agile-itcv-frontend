import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    skills: [{ type: String }],
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    quantity: { type: String },
    level: {
      type: String,
      required: true,
      enum: ["INTERN", "FRESHER", "JUNIOR", "SENIOR"],
    },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
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

export default mongoose.model("Job", JobSchema);
