import pool from "../config/db.js";
import bcrypt from "bcrypt";

// 1. fungsi menambahkan user ke Database, Respons dalam bentuk JSON, kalau ada errorMsg -> error
const addUser = async (req, res) => {   
    try{
        const saltRound = 10;
        const {username, password, role, name} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        if(username && password && role){
            const q = "INSERT INTO user (username, password_hash, role, name) VALUES (?, ?, ?, ?)";
            await pool.execute(q, [username, hashedPassword, role, name]) 
            return res.status(200).json({msg:"Data inserted successfully"});
            } else {
            return res.json({errorMsg:"Failed to Add User, caused by either: 1. No username, 2. No password, 3. No role,  in form submission"})
        }
    } catch (error) {
        if(error.hashedPassword){
        return res.status(500).json({errorMsg:"failed to hash password with Bcrypt "+error});
        }else{
        return res.status(500).json({errorMsg:"failed to make database query "+error});
        }
    }
};


// 2. fungsi mengambil User Data selain password, Respons dalam bentuk JSON, kalau ada errorMsg -> error
const getUser = async (req, res) => {
    try{
        const userId = req.payload.id; // payload jwt yang udh di decode di middleware authenticate
        const q = "SELECT user_id, username, role, name, preferred_theme, email, image FROM user WHERE user_id = ?";
        const [rows] = await pool.execute(q, [userId]);
        return res.status(200).json(rows[0]);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
};

// 3. fungsi edit Data name dan email milik user
const editUserProfile = async (req, res) => {
    try{
        const userId = req.payload.id; // payload jwt yang udh di decode di middleware authenticate
        const {name, email} = req.body; 
        const q = "UPDATE user SET name=?, email=? WHERE user_id=?";
        await pool.execute(q, [name, email, userId]);
        return res.status(200).json({msg: 'edit data success'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"+err});
    }
};

// 4. fungsi edit profil PIC TIK
const editPICProfile = async (req, res) => {
    try{
        const userId = req.payload.id; // payload jwt yang udh di decode di middleware authenticate
        const {nama_pic, nip_pic, email_pic} = req.body; 
        const q = "UPDATE user SET nama_pic=?, nip_pic=?, email_pic=? WHERE user_id=?";
        await pool.execute(q, [nama_pic, nip_pic, email_pic, userId]);
        return res.status(200).json({msg: 'edit data success'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"+err});
    }
}

// 5. fungsi edit password user
const editPassword = async (req, res) => {
    try{
        const connection = await pool.getConnection(); 
        await connection.beginTransaction();
        const userId = req.payload.id;
        const{password, confirmPassword}= req.body;

        if(confirmPassword.length<1){return res.status(403).json({errMsg:`Password too short`})}
        
        const q = "SELECT password_hash FROM user WHERE user_id = ?"; 
        const [rows] = await connection.execute(q, [userId]);
        const hashedPassword = rows[0].password_hash;
        const match = await bcrypt.compare(password, hashedPassword);

        if(!match){return res.status(403).json({errMsg:`Incorrect password`})}

        const q2 = "UPDATE user SET password_hash=? WHERE user_id = ?"
        const saltRound = 10;
        const confirmPassword_hashed = await bcrypt.hash(confirmPassword, saltRound)
        await connection.execute(q2, [confirmPassword_hashed, userId]);
        await connection.commit();
        return res.status(200).json({msg:'Successfully update password'})
        
    }catch(err){
        await connection.rollback();
        console.log(err)
        return res.status(500).json({errorMsg:"failed to make database query"+err});
    }
}



export {addUser, getUser, editUserProfile, editPICProfile, editPassword};