import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//1. Fungsi Login
// --cari user di database, kalo gaada catch error. Kemudian compare password hashnya pakai bcrypt.compare(req.password, db.password).
//   kalo oke lanjut buat token pakai jwt.sign({payload}, secretKey, {expiresIn}). Kirim refreshToken pakai res.Header('Set-Cookie', 'name=value;HttpOnly')
//   handle accessTokennya di frontEnd pakai variable/browser memory
const login = async (req, res) => {
    const{username, password}=req.body;
    const q = "SELECT * FROM user WHERE username = ?";

    try{
        const [rows] = await pool.execute(q, [username]);
        const hashedPassword = rows[0].password_hash;
        const match = await bcrypt.compare(password, hashedPassword);
        if(match){
            const accessToken = jwt.sign({id:rows[0].user_id, username:rows[0].username, name:rows[0].name, email:rows[0].email, image:rows[0].image, role:rows[0].role, kppn:rows[0].kppn},"secretKey", {expiresIn:60*30}); //generate token
            const refreshToken = jwt.sign({id:rows[0].user_id, username:rows[0].username, name:rows[0].name, email:rows[0].email, image:rows[0].image, role:rows[0].role, kppn:rows[0].kppn},"secretRefreshKey",{expiresIn:60*60*4});//generate refreshToken
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`);
            res.status(200).json({
                id:rows[0].user_id,
                username:rows[0].username,
                name:rows[0].name,
                email:rows[0].email,
                image:rows[0].image,
                role:rows[0].role,
                kppn:rows[0].kppn,
                accessToken,
                msg:"Login Sucess"
            });
        }else{
            return res.status(401).json({errorMsg:"Invalid Password"});
        }
    }catch(error){
        console.log(error);
        if(error.rows){
            return res.status(500).json({errorMsg:"Failed to database query"});
        }else if(error.match){
            return res.status(401).json({errorMsg:"Failed to verify password using Bcrypt"});
        }else if(error.accessToken || error.refreshToken){
            return res.status(500).json({errorMsg:"Failed to generate Token using jwt.sign"});
        }else{
        return res.status(401).json({errorMsg:"Invalid Username"});
        }
    }
}


//2. Fungsi refresh Token 
// --untuk verify accessToken di Middleware, utk verify refreshToken disini. Payload RefreshToken bentuknya {id:xx, username:xx, role:,..} ---
const refresh = (req, res) => {  
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json("no token")};

    try{
    jwt.verify(refreshToken, "secretRefreshKey",(err, payload)=>{
        console.log(payload.id)
        if(err){console.log(err); res.status(401).json({errorMsg:"invalid token"})};

        const accessToken = jwt.sign({id:payload.id, username:payload.username, name:payload.name, email:payload.email, image:payload.image, role:payload.role, kppn:payload.kppn},"secretKey", {expiresIn:60*30}); //generate token
        const refreshToken = jwt.sign({id:payload.id, username:payload.username, name:payload.name, email:payload.email, image:payload.image, role:payload.role, kppn:payload.kppn},"secretRefreshKey",{expiresIn:60*60*4});//generate refreshToken
        res.cookie('refreshToken', refreshToken, {httpOnly:true});
        res.status(200).json({
            id:payload.id,
            username:payload.username,
            name:payload.name,
            email:payload.email,
            image:payload.image,
            role:payload.role,
            kppn:payload.kppn,
            accessToken,
            msg:"Token has been refreshed"
        });

    });
    }catch(error){
        console.log(error);
        return res.status(401).json({errorMsg:"something wrong when creating new token or sending it as new cookie"})
    }

}

//3. Fungsi Logout
// 
const logout = (req, res) => {
    const refreshToken = req.cookies;
    res.clearCookie('refreshToken', {httpOnly:true });
    console.log(`refresh Token Cookies ${JSON.stringify(refreshToken)} has been cleared`);
    return res.status(200).json({msg:`User logged out, refresh Token Cookies has been cleared`});
}

export {login, refresh, logout}