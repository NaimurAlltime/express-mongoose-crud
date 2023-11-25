import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const UserSchema = new Schema<TUser, UserModel>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true, required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  isDeleted: { type: Boolean, default: false },
});

// pre save password hash
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save password field remove
// eslint-disable-next-line @typescript-eslint/no-explicit-any
UserSchema.post("save", function (doc: any, next) {
  doc.password = undefined;
  next();
});

// get all data only isDeleted property false
UserSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// get single data only isDeleted property false
UserSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//creating a custom static method
UserSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", UserSchema);
