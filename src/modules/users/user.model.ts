import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "./../../app/config";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from "./user.interface";

const fullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      maxlength: [25, "First name can't be more than 25 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      maxlength: [25, "Last name can't be more than 25 characters."],
    },
  },
  { _id: false }
);

const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      required: [true, "Street name is required."],
    },
    city: {
      type: String,
      required: [true, "City name is required."],
    },
    country: {
      type: String,
      required: [true, "Country name is required."],
    },
  },
  { _id: false }
);

const ordersSchema = new Schema<TOrders>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
  },
  { _id: false }
);

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      required: [true, "User ID is required."],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      maxlength: [32, "Password length can't be more than 25 characters."],
      minlength: [6, "Password length must be at least 6 characters."],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, "Full name is required."],
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, "Hobbies are required."],
    },
    address: {
      type: addressSchema,
      required: [true, "Address is required."],
    },
    orders: {
      type: [ordersSchema],
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );

    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
