import program from "../utils/commander.js";
import dotenv from "dotenv";

const { mode } = program.opts();

dotenv.config({
    path: mode === "development" ? "./.env.development" : "./.env.production"
});



export default{
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PUERTO,
    MONGO_URL: process.env.MONGO_URL
}