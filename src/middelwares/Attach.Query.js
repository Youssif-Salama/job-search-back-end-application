/**
 * a middleware that enable u to reuse it in any post endPoint
 * @param {*} model 
 * @returns a promise that u can add filters on it then execute
 */
export const attachAddQuery = (model) => {
    return (req, res, next) => {
        req.dbQuery = model.create(req.body);
        next();
    };
};

/**
 * a middleware that enable u to reuse it in any get endPoint
 * @param {*} model 
 * @returns a promise that u can add filters on it then execute
 */
export const attachGetQuery = (model) => {
    return (req, res, next) => {
        req.dbQuery = model.find();
        next();
    };
};

/**
 * a middleware that enable u to reuse it in any put endPoint
 * @param {*} model 
 * @returns a promise that u can add filters on it then execute
 */
export const attachUpdateQuery = (model) => {
    return (req, res, next) => {
        req.dbQuery = model.updateMany(req.body);
        next();
    };
};

/**
 * a middleware that enable u to reuse it in any delete endPoint
 * @param {*} model 
 * @returns a promise that u can add filters on it then execute
 */
export const attachDeleteQuery = (model) => {
    return (req, res, next) => {
        req.dbQuery = model.deleteMany();
        next();
    };
};
