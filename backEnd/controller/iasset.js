import pool from "../config/db.js";
import jwt from "jsonwebtoken";


const addIAsset = async (req, res) => {
    try{
        const periode = 1;  
        const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
        const {jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan} = req.body; 
        const {perangkatFilter, cpuFilter} = sanitizeInput(jenis_perangkat, model, cpu); // kalau aset non komputer, cpu dibuat default aja
    
        const q = `INSERT INTO 
                    iassetjunction (jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan, kppn, periode) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await pool.execute(q, [perangkatFilter, hostname, nama_pegawai, model, tahun, kondisi, cpuFilter, ip, ram, storage, serial_number, catatan, kppn, periode]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(err.kppn){
            console.log(err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
    
};

const getIAsset = async (req, res) => {
    try{
        const kppn = req.payload.kppn //payload jwt yang udh di decode di middleware authenticate 
        const q = "SELECT * FROM iassetjunction WHERE kppn=?"

        const [rows] = await pool.execute(q, [kppn]);
        return res.status(200).json(rows);
    }catch(err){
        if(err.rows){
            console.log(err);
            return res.status(500).json({errorMsg:"Failed to insert data to database"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};


const editIAsset = async (req, res) => {
    try{
        const periode = 1;  
        const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
        const {id, jenis_perangkat, hostname, nama_pegawai, model, tahun, kondisi, cpu, ip, ram, storage, serial_number, catatan} = req.body; 
        const {perangkatFilter, cpuFilter} = sanitizeInput(jenis_perangkat, cpu);
    
        const q =  `UPDATE iassetjunction 
                    SET jenis_perangkat=?, hostname=?, nama_pegawai=?, model=?, tahun=?, kondisi=?, cpu=?, ip=?, ram=?, storage=?, serial_number=?, catatan=?, periode=?
                    WHERE id=? AND kppn=?`;

        await pool.execute(q, [perangkatFilter, hostname, nama_pegawai, model, tahun, kondisi, cpuFilter, ip, ram, storage, serial_number, catatan, periode, id, kppn]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(err.kppn){
            console.log(err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};


const deleteIAsset = async (req, res) => {
    try{
        const id = req.params.rowId;
        const kppn = req.payload.kppn;
        const q = "DELETE from iassetjunction WHERE id = ? AND kppn = ?"
        
        await pool.query(q, [id, kppn]);
        return res.status(200).json({msg:"successfuly delete data"});
    }catch(err){
        if(err.kppn){
            console.log(err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log(err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};

export {addIAsset, getIAsset, editIAsset, deleteIAsset};




// --------------------------- Utility Function untuk filter dan sanitize input --------------------------------------

function sanitizeInput(jenis_perangkat, cpu){
    let perangkatFilter = jenis_perangkat;
    let cpuFilter = cpu;
    if(Number.isInteger(cpu)===false || jenis_perangkat<1){
        cpuFilter = 3;
    };

    return {perangkatFilter, cpuFilter}
}