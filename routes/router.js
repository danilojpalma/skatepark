import { Router } from "express";
import { tokenValidation } from "../config/tokenValidation.js";
import { getOneUser, registrarUsuario, registro, login, postLogin, getDataToken, updateUser, deleteUser, getAdminData, updateStatus } from "../controllers/dataController.js";

const router = Router();

// ruta para obtener todos los usuarios en la vista home
router.get("/", getOneUser);

// ruta para obtener la vista de registro
router.get("/registro", registro);

// ruta para obtener la vista de login
router.get("/login", login);

// ruta para registrar un usuario
router.post("/registro", registrarUsuario);

// ruta para manejar las solicitudes POST de inicio de sesión
router.post("/login", postLogin);

// ruta para actualizar un usuario
router.get("/updateUser", tokenValidation, getDataToken);


router.post("/updateUser", updateUser);
router.delete("/deleteUser/:email", deleteUser);

router.get("/admin", tokenValidation, getAdminData);

router.post("/updateEstado/:id", updateStatus)
export default router;