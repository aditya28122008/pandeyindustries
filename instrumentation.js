import mongoose from "mongoose";
import vars from "./vars";

export async function register() {
  await mongoose.connect(`${vars.mongoUri}`);
  console.log("Connected to Mongoose");
}
