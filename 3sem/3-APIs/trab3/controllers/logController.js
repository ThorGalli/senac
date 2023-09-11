import { Log } from "../models/Log.js";

export const logAction = async (descricao, userId) => {
    await Log.create({ descricao, usuario_id: userId });
};
