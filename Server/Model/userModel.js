import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
});

export default model("user", userSchema);
