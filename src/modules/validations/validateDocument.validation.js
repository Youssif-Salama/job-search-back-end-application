export const validate = (schema) => {
    return (req, res, next) => {
        try {
            const values = req.body;
            const { error } = schema.validate(values, { abortEarly: false });
            if (error) throw new Error(error);
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
};
