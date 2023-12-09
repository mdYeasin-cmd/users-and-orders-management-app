import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
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

const getAUserByUserIdFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select({
      password: 0,
      orders: 0,
      _id: 0,
    });

    return result;
  } else {
    throw new Error("Couldn't get any user using the user id!");
  }
};

const updateAUserByUserIdIntoDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndUpdate({ userId }, userData, {
      new: true,
    }).select({ password: 0, orders: 0, _id: 0 });

    return result;
  } else {
    throw new Error("Couldn't get any user using the user id!");
  }
};

const deleteAUserByUserIdFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error("Couldn't get any user using the user id!");
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getAUserByUserIdFromDB,
  updateAUserByUserIdIntoDB,
  deleteAUserByUserIdFromDB,
};
