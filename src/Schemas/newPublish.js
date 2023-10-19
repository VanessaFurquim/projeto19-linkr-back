import Joi from "joi";

// ------- schema de publish ---------

export const publishSchema = Joi.object({
    url: Joi.string().uri().trim().required(),
    description: Joi.string().allow("")
});
