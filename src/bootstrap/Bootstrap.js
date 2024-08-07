import express from "express";
import { dbConnection } from "../dbConnection/DbConnection.js";
import morgan from "morgan";
import env from "dotenv";
env.config();

export const Bootstrap = (app) => {
    const port = process.env.PORT || 10000;
    const BEStatement = {
        status: "ok",
        db: "connected successfully",
        server: `listening on port ${port}`
    }


    // Using Morgan As a Logger
    app.use(morgan("tiny"))

    //Error Handling middleware
    app.use((error, req, res, next) => {
        const status = error?.status || 500;
        console.log(error?.stack);
        const { message } = error;
        if (error.message?.includes("E11000")) {
            const errorIn = error?.message?.split("{")[1].split(":")[0];
            res.status(404).json({
                message: `Duplication key in ${errorIn}`
            })
        }
        res.status(status).json({
            message
        });
    })
    // Call DbConnection & Listening on port
    dbConnection().then(() => {
        app.listen(port, () => {
            console.log(BEStatement);
        })
    })
}