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


// export const pagination = (limit) => {
//     return (req, res, next) => {
//         const page = req.query.page;
//         const limitValueFromQuery = limit || req.query.limit;
//         const pageValue = page * 1 || 1;
//         const skipValue = ((pageValue - 1) * (limitValueFromQuery));

//         const model = req.dbQuery.model; // Get the model from the query
//         const countQuery = model.countDocuments(); // Create a new query for counting

//         req.dbQuery.skip(skipValue).limit(limitValueFromQuery);

//         countQuery.then((totalDocuments) => {
//             const numberOfPages = totalDocuments;;
//             const currentPage = pageValue;
//             const nextPage = currentPage < numberOfPages ? currentPage + 1 : null;
//             const prevPage = currentPage > 1 ? currentPage - 1 : null;

//             res.pagination = {
//                 currentPage,
//                 nextPage,
//                 prevPage,
//                 numberOfPages,
//             };

//             next();
//         });
//     };
// }

export const pagination = (limit) => {
    return (req, res, next) => {
        const page = req.query.page;
        const limitValueFromQuery = limit || req.query.limit;
        const pageValue = page * 1 || 1;
        const skipValue = ((pageValue - 1) * (limitValueFromQuery));

        const model = req.dbQuery.model; // Get the model from the query

        // Use the filters applied to req.dbQuery for the count query
        const filter = req.dbQuery.getFilter ? req.dbQuery.getFilter() : {}; // Ensure you have a getFilter method

        const countQuery = model.countDocuments(filter); // Create a new query for counting

        req.dbQuery.skip(skipValue).limit(limitValueFromQuery);

        countQuery.then((totalDocuments) => {
            const numberOfPages = Math.ceil(totalDocuments / limitValueFromQuery); // Calculate number of pages
            const currentPage = pageValue;
            const nextPage = currentPage < numberOfPages ? currentPage + 1 : null;
            const prevPage = currentPage > 1 ? currentPage - 1 : null;

            res.pagination = {
                currentPage,
                nextPage,
                prevPage,
                numberOfPages: totalDocuments,
            };

            next();
        }).catch((err) => {
            next(err);
        });
    };
};

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


export const sort = () => (req, res, next) => {
    const { sort, dir } = req.query
    if (!sort) return next()
    req.dbQuery = req.dbQuery.sort({ [sort]: dir })
    next()
}


export const search = () => (req, res, next) => {
    const { keyWord, value } = req.query;

    if (!keyWord || !value) return next();

    const searchCriteria = { [keyWord]: new RegExp(value, 'i') };
    req.dbQuery = req.dbQuery.where(searchCriteria);

    next();
};
