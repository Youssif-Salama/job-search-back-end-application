import Joi from "joi";
export const addJobSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().required().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().required().valid('part-time', 'full-time', 'freelance', 'volunteering'),
    seniorityLevel: Joi.string().required().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string().required().min(10).max(2000),
    technicalSkills: Joi.array().items(Joi.string().required()),
    softSkills: Joi.array().items(Joi.string().required()),
    addedBy: Joi.string().optional(),
    expiryDate: Joi.string().pattern(/^([0-9]{4})(\/|-)(1[0-2]|0?[1-9])\2(3[01]|[12][0-9]|0?[1-9])$/).optional()
})

export const updateJobSchema = Joi.object({
    jobTitle: Joi.string().optional(),
    jobLocation: Joi.string().optional().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().optional().valid('part-time', 'full-time', 'freelance', 'volunteering'),
    seniorityLevel: Joi.string().optional().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string().optional().min(10).max(2000),
    technicalSkills: Joi.array().items(Joi.string().optional()),
    softSkills: Joi.array().items(Joi.string().optional()),
    addedBy: Joi.string().optional(),
    expiryDate: Joi.string().optional()
})
