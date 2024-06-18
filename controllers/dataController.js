import path from "path";
import bcryptjs from "bcryptjs";
import { getAllUsersQuery, getOneUserQuery, buscarUsuario, postUser, updateUserQuery, deleteUserQuery, updateEstadoQuery } from "../models/queries.js";    
import { tokenGeneration } from "../config/tokenGeneration.js";   
import fs from "fs"; 

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../public/assets/imgs");

export const registro = async (req, res) => {
    return res.render("partials/registro");   
}

export const login = async (req, res) => {
    return res.render("partials/login");
}

export const getOneUser = async (req, res) => {
    try {
        const data = await getOneUserQuery();
        return res.render("partials/home", { data });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al obtener los datos" });
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
        res.status(500).json({ ok: false, msg: "Error al registrar el usuario" });
    }


}

export const postLogin = async (req, res) => {

    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
  
  
    try {
        // Admin
      if (email === adminEmail && password === adminPassword) {
        const data = await getAllUsersQuery();
        const adminToken = tokenGeneration(data);
        res.cookie("token", adminToken, {
          httpOnly: true,
          maxAge: 40000,
        });
  
        res.redirect("/admin");
  
      } else {
        // Usuario normal
        const user = await buscarUsuario(email);
        if (!user) return res.status(400).json({ ok: false, msg: "Email o contraseña incorrectos" });
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ ok: false, msg: "Email o contraseña incorrectos" });
        const token = tokenGeneration(user);

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 40000,
        });
  
        res.redirect("/updateUser");
  
      }
  
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error al iniciar sesión" });
    }
  }

export const getDataToken = (req, res) => {
    const user = req.user;
    res.render("partials/updateUser", { user });

  };

  export const getAdminData = (req, res) => {
    const admin = req.user;
    res.render("partials/admin", { admin });
  }

export const updateUser = async (req, res) => {
    const { email, nombre, password, verify_password, anos_experiencia, especialidad } = req.body;
    
    try {
        if (password !== verify_password)
            return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });
    
        const salt = await bcryptjs.genSalt(8);
        const passwordHash = await bcryptjs.hash(password, salt);
        
        await updateUserQuery(email, nombre, passwordHash, anos_experiencia, especialidad);
        return res.status(201).redirect("/")
    }
    catch (error) {
        res.status(500).json({ ok: false, msg: "Error al actualizar el usuario" });
    }

}
    

export const deleteUser = async (req, res) => {

    const { email } = req.params;
    try {
      const user = await buscarUsuario(email);
      const imageName = user.foto; 
      
      // Eliminar la imagen
      const imagePath = path.join(pathFile, imageName.replace('./assets/imgs/', ''));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Imagen eliminada: ${imageName}`);
        }
      });
      // Eliminar el usuario de la base de datos
      await deleteUserQuery(email);
      return res.status(201).send("Usuario eliminado correctamente");
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error al eliminar el usuario" });
    }
  }

  export const updateStatus = async (req, res) => { 
    const { id, estado } = req.body;
    
    try {
      await updateEstadoQuery(id, estado);
      return res.status(201).send("Estado actualizado correctamente");
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error al actualizar el estado" });
    }
  }