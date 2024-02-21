import Joi from "joi";
export const addCompanySchema = Joi.object({
    companyName: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(20).max(500),
    industry: Joi.string().required(),
    address: Joi.object({
        country: Joi.string().required(),
        governRate: Joi.string().required(),
        postalCode: Joi.string().optional(),
    }),
    numOfEmployees: Joi.object({
        from: Joi.number().required(),
        to: Joi.number().required(),
    }),
    email: Joi.string().email().required()
})

export const updateCompanySchema = Joi.object({
    companyName: Joi.string().optional().min(3).max(20),
    description: Joi.string().optional().min(20).max(500),
    industry: Joi.string().optional(),
    address: Joi.object({
        country: Joi.string().optional(),
        governRate: Joi.string().optional(),
        postalCode: Joi.string().optional(),
    }).optional(),
    numOfEmployees: Joi.object({
        from: Joi.number().optional(),
        to: Joi.number().optional(),
    }).optional()
})

export const updateEmailCompanySchema = Joi.object({
    email: Joi.string().email().required()
})