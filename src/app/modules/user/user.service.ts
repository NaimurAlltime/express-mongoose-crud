import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntuDB = async (userData: TUser) => {
  //custom static method
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exists!");
  }

  //build in static method
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

const getSingleUserFromDB = async (userId: string): Promise<TUser | null> => {
  const result = await User.isUserExists(userId);
  if (!result) {
    throw new Error("User not found!");
  } else {
    const result = await User.findOne({ userId }).select("-password");
    return result;
  }
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.isUserExists(userId);
  if (!result) {
    throw new Error("User not found!");
  } else {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    return result;
  }
};

export const UserService = {
  createUserIntuDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
