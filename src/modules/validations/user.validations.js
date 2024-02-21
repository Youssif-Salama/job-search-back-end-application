import Joi from "joi";
export const signupSchema = Joi.object({
    firstName: Joi.string().trim().required().min(3).max(10),
    lastName: Joi.string().trim().required().min(3).max(10),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/).required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
    DateOB: Joi.string(),
    skills: Joi.optional(),
    address: Joi.optional(),
});


export const loginSchema = Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/).optional(),

    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
})

export const updateSchema = Joi.object({
    firstName: Joi.string().trim().optional().min(3).max(10),
    lastName: Joi.string().trim().optional().min(3).max(10),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/).optional(),
    DateOB: Joi.string().optional(),
    skills: Joi.optional(),
    address: Joi.optional(),
    role: Joi.string().valid("USER", "COMPANY_HR").optional()
})

export const updatePasswordSchema = Joi.object({
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),

})
export const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required()
})