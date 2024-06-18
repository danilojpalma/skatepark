import path from "path";
import bcryptjs from "bcryptjs";
import { getQueryAll, buscarUsuario, postUser, updateUserQuery, deleteUserQuery } from "../models/queries.js";    
import { tokenGeneration } from "../config/tokenGeneration.js";    

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../public/assets/imgs");

export const registro = async (req, res) => {
    return res.render("partials/registro");   
}

export const login = async (req, res) => {
    return res.render("partials/login");
}




export const getAllUsers = async (req, res) => {
    try {
        const data = await getQueryAll();
        return res.render("partials/home", { data });
    } catch (error) {
        console.log(error);
    }
}

export const registrarUsuario = async (req, res) => {
    const { file } = req.files;
    const { email, nombre, password, verify_password, anos_experiencia, especialidad } = req.body;
    
    try {
        if (password !== verify_password)
            return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });
    
        const nameFile = `${nombre.split(" ").join("")}.jpg`;
        const urlFile = `./assets/imgs/${nameFile}`;
    
        file.mv(path.join(pathFile, nameFile), (err) => {
            if (err) {
                return res.status(500).json({ ok: false, msg: "Error al subir la imagen" });
            }
        });

        const emailExist = await buscarUsuario(email);
        if (emailExist) return res.status(400).json({ ok: false, msg: "El email ya existe" });

        const salt = await bcryptjs.genSalt(8);
        const passwordHash = await bcryptjs.hash(password, salt);
        
        await postUser(email, nombre, passwordHash, anos_experiencia, especialidad, urlFile);

        return res.status(201).redirect("/");
    }
    catch (error) {
        console.log(error);
    }


}

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await buscarUsuario(email);
        if (!user) return res.status(400).json({ ok: false, msg: "Email o contraseña incorrectos" });

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ ok: false, msg: "Email o contraseña incorrectos" });

        const token = tokenGeneration(user);

        res.cookie("token", token, 
            { httpOnly: true,
              maxAge: 40000 , 
               
            })

        res.redirect("/updateUser");

    
    } catch (error) {
        console.log(error);
    }
}

export const getDataToken = (req, res) => {
    const user = req.user;
    res.render("partials/updateUser", { user });

  };

export const updateUser = async (req, res) => {
    const { email, nombre, password, verify_password, anos_experiencia, especialidad } = req.body;
    // email no esta llegando desde el formulario
    
    console.log(email, nombre, password, verify_password, anos_experiencia, especialidad);
    
    try {
        if (password !== verify_password)
            return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });
    
        const salt = await bcryptjs.genSalt(8);
        const passwordHash = await bcryptjs.hash(password, salt);
        
        await updateUserQuery(email, nombre, passwordHash, anos_experiencia, especialidad);


        return res.status(201).redirect("/")
    }
    catch (error) {
        console.log(error);
    }

}
    

export const deleteUser = async (req, res) => {
    const { email } = req.params
    console.log(email);
    try {
        await deleteUserQuery(email);
        return res.status(201).redirect("/")
    } catch (error) {
        console.log(error);
    }
}
