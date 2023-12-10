import Joi from "joi";

const createFullNameValidationSchema = Joi.object({
    firstName: Joi.string().required().max(25),
    lastName: Joi.string().required().max(25),
});

const createAddressValidationSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
});

const createUserValidationSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required().max(32).min(6),
    fullName: createFullNameValidationSchema.required(),
    age: Joi.number().required(),
    email: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    hobbies: Joi.array().items(Joi.string()).required(),
    address: createAddressValidationSchema.required(),
});

const createOrdersValidationSchema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
});

const updateFullNameValidationSchema = Joi.object({
    firstName: Joi.string().max(25).optional(),
    lastName: Joi.string().max(25).optional(),
});

const updateAddressValidationSchema = Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
});

const updateUserValidationSchema = Joi.object({
    userId: Joi.number().optional(),
    username: Joi.string().optional(),
    password: Joi.string().max(32).min(6).optional(),
    fullName: updateFullNameValidationSchema.optional(),
    age: Joi.number().optional(),
    email: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    hobbies: Joi.array().items(Joi.string()).optional(),
    address: updateAddressValidationSchema.optional(),
});

export const UserValidations = {
    createUserValidationSchema,
    createOrdersValidationSchema,
    updateUserValidationSchema,
};
