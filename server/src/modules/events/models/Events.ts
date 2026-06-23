import mongoose, { Schema } from "mongoose";

const eventsSchema = new Schema(
  {
    image_urls: {
      type: [String],
      required: true,
    },
    public_ids: {
      type: [String],
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "postponed", "cancelled"],
      default: "upcoming",
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    time: {
      type: String,
      required: true,
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

export default mongoose.model("Events", eventsSchema, "events");
