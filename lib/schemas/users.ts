import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: String,
  ceeLink: String,
  // phone: {
  //   type: String,
  //   required: true,
  // },
  // address: {
  //   type: String,
  //   required: true,
  // },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
  // isSeller: {
  //   type: Boolean,
  //   default: false,
  // },
  // isBuyer: {
  //   type: Boolean,
  //   default: false,
  // },
  // cart: {
  //   type: Array,
  //   default: [],
  // },
  // orders: {
  //   type: Array,
  //   default: [],
  // },
  // reviews: {
  //   type: Array,
  //   default: [],
  // },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
