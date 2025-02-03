import dotenv from "dotenv";



dotenv.config();



export default{
    PORT: process.env.PUERTO || 8080,
    MONGO_URL: process.env.MONGO_URL
}