import { TOrders, TUser } from "./user.interface";
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

const addAOrderByUserIdIntoDB = async (userId: number, orderData: TOrders) => {
    if (await User.isUserExists(userId)) {
        const result = await User.updateOne(
            { userId },
            { $push: { orders: orderData } },
        );

        return result;
    } else {
        throw new Error("Couldn't get any user using the user id!");
    }
};

const getAllOrdersByUserIdFromDB = async (userId: number) => {
    if (await User.isUserExists(userId)) {
        const result = await User.findOne({ userId }).select({
            orders: 1,
            _id: 0,
        });

        return result;
    } else {
        throw new Error("Couldn't get any user using the user id!");
    }
};

const calculateTotalPriceByUserIdFromDB = async (userId: number) => {
    if (await User.isUserExists(userId)) {
        let totalPrice = 0;
        const user = await User.findOne({ userId });
        const orderList = user?.orders;

        if (orderList && orderList?.length > 0) {
            orderList?.forEach((singleOrder: TOrders) => {
                const productPrice = singleOrder.price * singleOrder.quantity;
                totalPrice = totalPrice + productPrice;
            });
        }

        return { totalPrice: totalPrice };
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
    addAOrderByUserIdIntoDB,
    getAllOrdersByUserIdFromDB,
    calculateTotalPriceByUserIdFromDB,
};
