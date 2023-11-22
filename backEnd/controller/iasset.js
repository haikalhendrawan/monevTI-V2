import pool from "../config/db.js";
import jwt from "jsonwebtoken";


const addIAsset = async (req, res) => {
    const periode = 1;  
    const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const {jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan} = req.body; 
    const {perangkatFilter, modelFilter, cpuFilter} = validateInput(jenis_perangkat, model, cpu);

    const q = `INSERT INTO 
                iassetjunction (jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan, kppn, periode) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try{
        await pool.execute(q, [perangkatFilter, hostname, nama_pegawai, modelFilter, tahun, kondisi, cpuFilter, ip, ram, storage, serial_number, catatan, kppn, periode]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(!kppn){
            console.log(err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
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
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
}


const editIAsset = async (req, res) => {
    const periode = 1;  
    const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const {id, jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan} = req.body; 
    const {perangkatFilter, modelFilter, cpuFilter} = validateInput(jenis_perangkat, model, cpu);

    const q =  `UPDATE iassetjunction 
                SET jenis_perangkat=?, hostname=?, nama_pegawai=?, model=?, tahun=?, kondisi=?, cpu=?, ip=?, ram=?, storage=?, serial_number=?, catatan=?, periode=?
                WHERE id=? AND kppn=?`;
    try{
        await pool.execute(q, [perangkatFilter, hostname, nama_pegawai, modelFilter, tahun, kondisi, cpuFilter, ip, ram, storage, serial_number, catatan, periode, id, kppn]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(!kppn){
            console.log(err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
}


const deleteIAsset = async (req, res) => {
    const id = req.params.rowId;
    const kppn = req.payload.kppn;
    const q = "DELETE from iassetjunction WHERE id = ? AND kppn = ?"
    try{
        console.log(id);
        await pool.query(q, [id, kppn]);
        return res.status(200).json({msg:"successfuly delete data"});
    }catch(err){
        if(!kppn){
            console.log(err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
}

export {addIAsset, getIAsset, editIAsset, deleteIAsset};




// --------------------------- Utility Function untuk filter dan sanitize input --------------------------------------

function validateInput(jenis_perangkat, model, cpu){
    let perangkatFilter = jenis_perangkat;
    let modelFilter = model;
    let cpuFilter = cpu;
    if(Number.isInteger(cpu)===false){
        cpuFilter = 3;
    };

    return {perangkatFilter, modelFilter, cpuFilter}
}