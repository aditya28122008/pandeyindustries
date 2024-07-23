import { Schema } from "mongoose";
import Mongoose from "mongoose";

const users = new Schema(
  {
    id: {
      type: String,
      default: () => new Mongoose.Types.ObjectId().toString(),
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },    
  { timestamps: true }
);

Mongoose.models = {};

export default Mongoose.model("Users", users);
