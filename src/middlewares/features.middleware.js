export const filterQuery = ({ fieldName, paramName }) => {
    return (req, res, next) => {
        req.dbQuery = req.dbQuery.where({ [fieldName]: req.params[paramName] });
        next();
    }
}


export const populate = (field) => {
    return (req, res, next) => {
        req.dbQuery = req.dbQuery.populate(field)
        next();
    }
}


export const pagination = (limit) => {
    return (req, res, next) => {
        const page = req.query.page;
        const limitValueFromQuery = limit || req.query.limit;
        const pageValue = page * 1 || 1;
        const skipValue = ((pageValue - 1) * (limitValueFromQuery));
        req.dbQuery.skip(skipValue).limit(limitValueFromQuery);
        next();
    }
}


export const filter = (req, res, next) => {
    let filterObject = { ...req.query };
    const excludedQuery = ["page", "limit", "sort", "fields", "keyword"];
    excludedQuery.forEach((eq) => {
        delete filterObject[eq];
    });
    if (Object.keys(filterObject).length !== 0) req.dbQuery.options = {};
    filterObject = JSON.stringify(filterObject);
    filterObject = filterObject.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`);
    filterObject = JSON.parse(filterObject);

    req.dbQuery = req.dbQuery.where(filterObject);
    next();
};


export const sort = (req, res, next) => {
    let sort = req.query.sort;
    if (!sort) next();
    else {
        sort = sort.split(",").join(" ");
        req.dbQuery.sort(sort);
        next();
    }
}

export const search = (req, res, next) => {
    let keyword = req.query.keyword;
    if (!keyword) return next();
    const excludedQuery = ["page", "limit"];
    excludedQuery.forEach(q => (delete req.query[q]))
    req.dbQuery.find({
        $or: [
            { "jobTitle": { $regex: keyword, $options: "i" } },
            { "jobDescription": { $regex: keyword, $options: "i" } }
        ]
    })

    next();
}