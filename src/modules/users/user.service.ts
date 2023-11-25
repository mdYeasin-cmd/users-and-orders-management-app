import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  console.log(userData, "user service file here");
  const result = await User.create(userData);
  console.log(result, "user created");
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
