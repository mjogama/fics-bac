import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema(
  {
    image_urls: {
      type: [String],
      required: true,
    },
    public_ids: {
      type: [String],
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    purpose: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
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

export default mongoose.model("Membership", membershipSchema, "membership");
