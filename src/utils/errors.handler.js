export const catchAsyncError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};


export class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}