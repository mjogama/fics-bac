import mongoose, { Schema } from "mongoose";

const ourTeamSchema = new Schema(
  {
    profileImageUrl: {
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
