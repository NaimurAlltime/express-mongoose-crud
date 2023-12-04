import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TProduct, TUser, UserModel } from "./user.interface";

const ordersSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required!"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "User id is required!"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "User id is required!"],
      trim: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, "User id is required!"],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    trim: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "First name is required!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required!"],
      trim: true,
    },
  },
  age: { type: Number, required: [true, "Age is required!"] },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  isActive: {
    type: Boolean,
  },
  hobbies: {
    type: [String],
    required: [true, "Hobbies are required!"],
    trim: true,
  },
  address: {
    street: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
    },
  },
  orders: [ordersSchema],
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
  doc.orders = undefined;
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
UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", UserSchema);
