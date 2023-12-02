import pool from "../config/db.js";
import jwt from "jsonwebtoken";


const addIUser = async (req, res) => {
    try{
        const periode = 1;  
        const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
        const {app, name, username, role, email, pelatihan, catatan} = req.body; 
        const {pelatihanFilter} = sanitizeInput(pelatihan); 
    
        const q = `INSERT INTO 
                    iuserjunction (app, name, username, role, email, pelatihan, catatan, kppn, periode) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await pool.execute(q, [app, name, username, role, email, pelatihanFilter, catatan, kppn, periode]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(!kppn){
            console.log('No jwt payload while trying to add iuser data'+ err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log('Internal server error while trying to add iuser data'+ err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};

const getIUser = async (req, res) => {
    try{
        const kppn = req.payload.kppn //payload jwt yang udh di decode di middleware authenticate 
        const q = "SELECT * FROM iuserjunction WHERE kppn=?";
        
        const [rows] = await pool.execute(q, [kppn]);
        return res.status(200).json(rows);
    }catch(err){
        if(!rows){
            console.log('no rows returned while trying to get iuser data' + err);
            return res.status(500).json({errorMsg:"Failed to insert data to database"});
        };
        console.log('Internal server error while trying to get iuser data' + err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};

const editIUser = async (req, res) => {
    try{
        const periode = 1;  
        const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
        const {id, app, name, username, role, email, pelatihan, catatan} = req.body; 
        const {pelatihanFilter} = sanitizeInput(pelatihan); 
    
        const q =  `UPDATE iuserjunction 
                    SET app=?, name=?, username=?, role=?, email=?, pelatihan=?, catatan=?, periode=?
                    WHERE id=? AND kppn=?`;

        await pool.execute(q, [app, name, username, role, email, pelatihanFilter, catatan, periode, id, kppn]);
        return res.status(200).json({msg:"data inserted successfully"});
    }catch(err){
        if(!kppn){
            console.log('No jwt payload while trying to update iuser data'+ err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log('Internal server error while trying to get iuser data'+ err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};


const deleteIUser = async (req, res) => {
    try{
        const id = req.params.rowId;
        const kppn = req.payload.kppn;
        const q = "DELETE from iuserjunction WHERE id = ? AND kppn = ?";
        
        console.log(id);
        await pool.query(q, [id, kppn]);
        return res.status(200).json({msg:"successfuly delete data"});
    }catch(err){
        if(!kppn){
            console.log('No jwt payload while trying to delete iuser data'+ err);
            return res.status(403).json({errMsg:"Not authenticated"});
        };
        console.log('Internal server error while trying to get iuser data'+ err);
        return res.status(500).json({errMsg:"Internal Server Error"});
    }
};

export {addIUser, getIUser, editIUser, deleteIUser};




// --------------------------- Utility Function untuk filter dan sanitize input --------------------------------------

function sanitizeInput(pelatihan){
    let pelatihanFilter = pelatihan;
    if(Number.isInteger(pelatihan)===false){
        pelatihanFilter = 0;
    };

    return {pelatihanFilter}
}