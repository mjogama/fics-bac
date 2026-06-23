import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    office_hours: {
      type: String,
      trim: true,
      required: true,
    },
    socials: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Contact", contactSchema, "contacts");
