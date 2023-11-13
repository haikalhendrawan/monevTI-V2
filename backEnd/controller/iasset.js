import pool from "../config/db.js";
import jwt from "jsonwebtoken";


const addIAsset = async (req, res) => {
    const periode = 1;  
    const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const {jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan} = req.body; 
    const q = `INSERT INTO 
                iassetjunction (jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan, kppn, periode) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try{
        await pool.execute(q, [jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan, kppn, periode]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(!kppn){
            console.log(err);
            return res.status(403).json({errMsg:"not authenticated"});
        }
        return res.status(500).json({errMsg:"failed to interact with database"});
    }
    
}

const getIAsset = async (req, res) => {
    const kppn = req.payload.kppn //payload jwt yang udh di decode di middleware authenticate 
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