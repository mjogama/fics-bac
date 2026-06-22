import mongoose, { Schema } from "mongoose";

const concernSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    type: {
      type: String,
      enum: ["General", "Fees", "Events", "Technical", "Suggestion", "Complaint", "Other"],
      default: "General",
    },
    subject: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Concern", concernSchema, "concerns");
