import { model, Schema } from "mongoose";
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrder,
  UserModel,
} from "./user.interface";

// Define sub user schemas
const UserFullNameSchema = new Schema<TUserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const UserOrderSchema = new Schema<TUserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define the main User schema
const UserSchema = new Schema<TUser>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: UserFullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: UserAddressSchema, required: true },
  orders: { type: [UserOrderSchema] },
  isDeleted: { type: Boolean },
});

export const Student = model<TUser, UserModel>("User", UserSchema);
