import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const addLogBook = async(req, res) => {
  try{
    // const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const {date, name, hostname, event, clearance, status, isUnique} = req.body;
    const q = `INSERT INTO logbooktik(date, name, hostname, event, clearance, status, isUnique) 
                VALUES(?, ?, ?, ?, ?, ?, ?)`;
    await pool.execute(q, [date, name, hostname, event, clearance, status, isUnique])
    return res.status(200).json({msg:'Insert Data Success'})

  }catch(err){
    return res.status(500).json({errMsg:err})
  }
};

const getLogBook = async(req, res) => {
  try{
    // const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const q = "SELECT * FROM logbooktik";
    const [rows] = await pool.execute(q)

    return res.status(200).json(rows)

  }catch(err){
    return res.status(500).json({errMsg:err})
  }

};

const editLogBook = async(req, res) => {
  try{
    // const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const {status, id} = req.body;
    const q = "UPDATE logbooktik SET status=? WHERE id=?";
    await pool.execute(q, [status, id])

    return res.status(200).json({msg:'Update Data Success'})

  }catch(err){
    return res.status(500).json({errMsg:err})
  }
};


const deleteLogBook = async(req, res) => {
  try{
    // const kppn = req.payload.kppn; //payload jwt yang udh di decode di middleware authenticate
    const id= req.params.id;
    const q = "DELETE from logbooktik WHERE id=?";
    await pool.execute(q, [id])

    return res.status(200).json({msg:'Delete Data Success'})

  }catch(err){
    return res.status(500).json({errMsg:err})
  }
};


export {addLogBook, getLogBook, editLogBook, deleteLogBook}