import mongoose, { Schema } from "mongoose";

const concernSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["General", "Fees", "Events", "Technical", "Suggestion", "Complaint", "Other"],
      default: "General",
    },
    subject: {
      type: String,
      trim: true,
      required: true,
    },
    details: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Concern", concernSchema, "concerns");
