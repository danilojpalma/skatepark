import { query } from 'express';
import pool from '../config/db.js';

const getAllUsersQuery = async () => {  
    const { rows } = await pool.query("select * from skaters");
    return rows;
}

const getOneUserQuery = async () => {
    const { rows } = await pool.query("select * from skaters");
    return rows;
}

const buscarUsuario = async (email) => {
    const query = {
        text: "select * from skaters where email = $1",
        values: [email]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}

const postUser = async (email, nombre, password, anos_experiencia, especialidad, foto) => {
    const query = {
        text: "insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values ($1, $2, $3, $4, $5, $6, false) returning email,nombre,anos_experiencia,especialidad,foto,estado",
        values: [email, nombre, password, anos_experiencia, especialidad, foto]
    }

    const { rows } = await pool.query(query);
    return rows[0];
    
}

const updateUserQuery = async (email, nombre, password, anos_experiencia, especialidad) => {
    const query = {
        text: "update skaters set nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 where email = $1",
        values: [email, nombre, password, anos_experiencia, especialidad ]
    }
    

    const { rows } = await pool.query(query);
    return rows[0];
}

const deleteUserQuery = async (email) => {
    const query = {
        text: "delete from skaters where email = $1",
        values: [email]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}

const updateEstadoQuery = async (id, estado) => {
    const query = {
        text: "update skaters set estado = $2 where id = $1",
        values: [id, estado]
    }

    const { rows } = await pool.query(query);
    return rows[0];
}


export {
    getAllUsersQuery,
    getOneUserQuery,
    buscarUsuario,
    postUser,
    updateUserQuery,
    deleteUserQuery,
    updateEstadoQuery
}