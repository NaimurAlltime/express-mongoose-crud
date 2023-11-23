import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const UserSchema = new Schema<TUser, UserModel>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
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

//creating a custom static method
UserSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

//creating a custom static method check single user
// UserSchema.statics.isUserSingleExists = async function (userId: string) {
//   const existingSingleUser = await User.findOne({ userId })
//     .select("-password")
//     .lean()
//     .exec();
//   // return existingSingleUser;
//   if (!existingSingleUser) {
//     return null; // User not found
//   }
//   return existingSingleUser;
// };

export const User = model<TUser, UserModel>("User", UserSchema);
