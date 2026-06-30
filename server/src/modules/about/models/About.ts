import mongoose, { Schema } from "mongoose";

const aboutSchema = new Schema(
  {
    org_about: {
      type: String,
      trim: true,
      required: true,
    },
    mission: {
      type: String,
      trim: true,
      required: true,
    },
    vision: {
      type: String,
      trim: true,
      required: true,
    },
    active_members: {
      type: Number,
      min: 0,
      required: true,
    },
    yearly_event: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("About", aboutSchema, "about");
