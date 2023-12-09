// import { z } from "zod";

// const fullNameValidationSchema = z.object({
//   firstName: z
//     .string()
//     .min(1)
//     .max(25, { message: "First name must be between 1 and 25 characters." }),
//   lastName: z
//     .string()
//     .min(1)
//     .max(25, { message: "Last name must be between 1 and 25 characters." }),
// });

// const addressValidationSchema = z.object({
//   street: z.string().min(1, { message: "Street name is required." }),
//   city: z.string().min(1, { message: "City name is required." }),
//   country: z.string().min(1, { message: "Country name is required." }),
// });

// const ordersValidationSchema = z.object({
//   productName: z.string().min(1, { message: "Product name is required." }),
//   price: z.number({ message: "Price is required." }),
//   quantity: z.number({ message: "Quantity is required." }),
// });

// const userValidationSchema = z.object({
//   userId: z.number({ message: "User ID is required." }),
//   username: z.string().min(1, { message: "Username is required." }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters." })
//     .max(32, { message: "Password can't be more than 32 characters." }),
//   fullName: fullNameValidationSchema,
//   age: z.number({ message: "Age is required." }),
//   email: z.string().email({ message: "Invalid email format." }),
//   isActive: z.boolean({ message: "isActive must be a boolean." }),
//   hobbies: z.array(
//     z.string().min(1, { message: "At least one hobby is required." })
//   ),
//   address: addressValidationSchema,
//   orders: z.array(ordersValidationSchema).optional(),
// });

// export default userValidationSchema;
