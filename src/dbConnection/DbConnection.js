import mongoose from "mongoose";
import env from "dotenv";
env.config();


export const dbConnection = async() => {
    try{
        await mongoose.connect(`${process.env.DataBaseHost}${process.env.DataBaseName}`)
    }
    catch(error){
        throw error;
    }
}