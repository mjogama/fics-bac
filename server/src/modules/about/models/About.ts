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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("About", aboutSchema, "about");
