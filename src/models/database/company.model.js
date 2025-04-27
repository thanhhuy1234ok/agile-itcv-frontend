import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
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

export default mongoose.model("Company", CompanySchema);
