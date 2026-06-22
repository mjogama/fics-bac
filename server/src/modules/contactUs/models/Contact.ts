import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    office_hours: {
      type: String,
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
