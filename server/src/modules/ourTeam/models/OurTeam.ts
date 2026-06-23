import mongoose, { Schema } from "mongoose";

const ourTeamSchema = new Schema(
  {
    public_id: {
      type: String,
      required: true,
      unique: true,
    },
    profile_image_url: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    position: {
      type: String,
      trim: true,
      required: true,
    },
    term: {
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

export default mongoose.model("OurTeam", ourTeamSchema, "ourTeam");
