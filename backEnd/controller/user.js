import pool from "../config/db.js";
import bcrypt from "bcrypt";

// 1. fungsi menambahkan user ke Database, Respons dalam bentuk JSON, kalau ada errorMsg -> error
const addUser = async (req, res) => {   
    const saltRound = 10;
    const {username, password, role, name} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, saltRound);
        if(username && password && role){
            const q = "INSERT INTO user (username, password_hash, role, name) VALUES (?, ?, ?, ?)";
            await pool.execute(q, [username, hashedPassword, role, name]) 
            return res.status(400).json({msg:"Data inserted successfully"});
            } else {
            return res.json({errorMsg:"Failed to Add User, caused by either: 1. No username, 2. No password, 3. No role,  in form submission"})
        }
    } catch (error) {
        if(!hashedPassword){
        return res.status(500).json({errorMsg:"failed to hash password with Bcrypt "+error});
        }else{
        return res.status(500).json({errorMsg:"failed to make database query "+error});
        }
    }
}


// 2. fungsi mengambil User Data selain password, Respons dalam bentuk JSON, kalau ada errorMsg -> error
const getUser = async (req, res) => {
    try{
        const userId = req.payload.id
        const q = "SELECT user_id, username, role, name, preferred_theme, email, image FROM user WHERE user_id = ?";
        const [rows] = await pool.execute(q, [userId]);
        return res.json(rows[0]);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}


export {addUser, getUser};