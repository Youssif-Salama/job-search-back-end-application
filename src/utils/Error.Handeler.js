/**
    *CatchAsyncError Cover
    *A function that catch end points error and return it using AppError class that extend from Error Interface
    *CatchAsyncError((req,res)=>{})
    * @param {Function} fn - The asynchronous function to be wrapped.
    * @returns {Function} - A function that wraps the asynchronous function and catches any errors.
*/
export const CatchAsyncErrors = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
    *AppError 
    *You Can Throw Error Using This Class Method
    *throw new AppError(statue,message)
*/
export class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}