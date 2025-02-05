import { usersService } from "../services/index.js";
import EErrors from "../services/errors/enums.js";
import CustomError from "../services/errors/custom-error.js";
import { generateUserNotFoundErrorInfo } from "../services/errors/info.js";

const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();
    res.send({ status: "success", payload: users })
}

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.uid;

        if (!userId || userId.length !== 24) {

            throw CustomError.createError({
                name: "Error en parámetro",
                cause: generateUserNotFoundErrorInfo(userId),
                message: "Error: ID de usuario incorrecto",
                code: EErrors.ROUTING_ERROR
            });
        }

        const user = await usersService.getUserById(userId);

        
        if (!user) {
            throw CustomError.createError({
                name: "Usuario no encontrado",
                cause: generateUserNotFoundErrorInfo(userId),
                message: "Error: El usuario no existe",
                code: EErrors.ROUTING_ERROR
            });
        }
        res.status(200).json({ status: "success", payload: user });

    } catch (error) {
        next(error);
    }
};


const updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" })
    const result = await usersService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" })
}

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({ status: "success", message: "User deleted" })
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}