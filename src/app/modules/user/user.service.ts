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

export const UserService = {
  createUserIntuDB,
};
