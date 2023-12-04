import { z } from "zod";

// Zod schema for the orders
export const OrdersSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "Product name is required!",
    }),
  price: z
    .number()
    .min(0)
    .refine((data) => data >= 0, {
      message: "Price must be greater than or equal to 0",
    }),
  quantity: z
    .number()
    .min(1)
    .refine((data) => data >= 1, {
      message: "Quantity must be greater than or equal to 1",
    }),
});

// Zod schema for the full name
const FullNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "First name is required!",
    }),
  lastName: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "Last name is required!",
    }),
});

// Zod schema for the address
const AddressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "Street is required!",
    }),
  city: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "City is required!",
    }),
  country: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "Country is required!",
    }),
});

// Zod schema for the user
export const userValidationSchema = z.object({
  userId: z
    .number()
    .min(1)
    .refine((data) => data >= 1, {
      message: "User ID must be greater than or equal to 1",
    }),
  username: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: "Username is required!",
    }),
  password: z
    .string()
    .trim()
    .min(6)
    .refine((data) => data.trim().length > 0, {
      message: "Password is required!",
    }),
  fullName: FullNameSchema,
  age: z
    .number()
    .min(1)
    .refine((data) => data >= 1, {
      message: "Age must be greater than or equal to 1",
    }),
  email: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .email("Invalid email format!")
    .refine((data) => data.trim().length > 0, {
      message: "Email is required!",
    }),
  isActive: z.boolean(),
  hobbies: z
    .array(z.string().trim().min(1).max(255))
    .refine((data) => data.length > 0, {
      message: "Hobbies are required!",
    }),
  address: AddressSchema,
  orders: z.array(OrdersSchema).optional(),
});
