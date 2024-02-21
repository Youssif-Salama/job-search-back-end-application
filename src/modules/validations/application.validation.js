import Joi from "joi";

export const applySchema = Joi.object({
    jobId: Joi.string().hex().required(),
    userId: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string().optional()),
    softSkills: Joi.array().items(Joi.string().optional()),
    userResume: Joi.object({
        resumeTitle: Joi.string().required(),
        resumePath: Joi.string().required(),
        asset_id: Joi.string().required(),
    })

});
