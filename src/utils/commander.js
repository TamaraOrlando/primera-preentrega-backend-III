import { Command } from "commander";
const program = new Command(); 


program
    .option("-p <port>", "puerto en donde se ejecuta el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "development")
program.parse()


export default program; 