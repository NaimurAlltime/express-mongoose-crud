import { Model } from "mongoose";

export type TProduct = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TProduct[];
};

// for creating static
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
