import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

export const authorModel = mongoose.model("Author", authorSchema);
