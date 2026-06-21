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
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("OurTeam", ourTeamSchema, "ourTeam");
