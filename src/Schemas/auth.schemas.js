import Joi from "joi";

// ------- schema de signIn ---------

export const signInSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(3).required()
});


// ------- schema de signUp ---------


export const signUpSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(3).required(),
    username: Joi.string().required(),
    photo: Joi.string().uri().trim().required()
});