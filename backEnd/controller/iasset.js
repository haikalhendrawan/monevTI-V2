import pool from "../config/db.js";
import jwt from "jsonwebtoken";


const addIAsset = (req, res) => {

}

const getIAsset = async (req, res) => {
    const {id, username, role, kppn} = req.payload //payload jwt yang udh di decode di middleware authenticate 
    const q = "SELECT * FROM iassetjunction WHERE kppn=?"
    try{
        const [rows] = await pool.execute(q, [kppn]);
        return res.status(200).json(rows);
    }catch(err){
        console.log(err);
        if(!rows){
            return res.status(500).json({errorMsg:"Failed to insert data to database"});
        }
    }
}


const editIAsset = (req, res) => {

}


const deleteIAsset = (req, res) => {

}

export {addIAsset, getIAsset, editIAsset, deleteIAsset};