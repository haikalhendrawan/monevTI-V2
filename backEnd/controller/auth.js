import connection from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//1. Fungsi Login
// --cari user di database, kalo gaada catch error. Kemudian compare password hashnya pakai bcrypt.compare(req.password, db.password).
//   kalo oke lanjut buat token pakai jwt.sign({payload}, secretKey, {expiresIn}). Kirim refreshToken pakai res.Header('Set-Cookie', 'name=value;HttpOnly')
//   handle accessTokennya di frontEnd pakai variable/browser memory
const login = async (req, res)=>{
    const{username, password}=req.body;
    const q = "SELECT * FROM user WHERE username = ?";

    try{
        const [rows] = await connection.execute(q, [username]);
        const hashedPassword = rows[0].password_hash;
        const match = await bcrypt.compare(password, hashedPassword);
        if(match){
            const accessToken = jwt.sign({id:rows[0].user_id, username: rows[0].username, role:rows[0].role},"secretKey", {expiresIn:60*15}); //generate token
            const refreshToken = jwt.sign({id:rows[0].user_id, username: rows[0].username, role:rows[0].role},"secretRefreshKey",{expiresIn:60*60*24});//generate refreshToken
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`);
            res.status(200).json({
                username: rows[0].username,
                role:rows[0].role,
                accessToken,
                msg:"Login Sucess"
            });
        }else{
            res.status(401).json({errorMsg:"Invalid Password"});
        }
    }catch(error){
        console.log(error);
        if(error.rows){
            res.status(500).json({errorMsg:"Failed to database query"});
        }else if(error.match){
            res.status(401).json({errorMsg:"Failed to verify password using Bcrypt"});
        }else if(error.accessToken || error.refreshToken){
            res.status(500).json({errorMsg:"Failed to generate Token using jwt.sign"});
        }else{
        res.status(401).json({errorMsg:"Invalid Username"});
        }
    }
}


//2. Fungsi refresh Token 
// --untuk verify accessToken di Middleware, utk verify refreshToken disini. Payload RefreshToken bentuknya {id:xx, username:xx, role:,..} ---
const refresh = (req, res)=>{  
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){res.status(401).json("no token")};

    try{
    jwt.verify(refreshToken, "secretRefreshKey",(err, payload)=>{
        if(err){console.log(err); res.status(401).json({errorMsg:"invalid token"})};

        const accessToken = jwt.sign({id:payload.id, username: payload.username, role:payload.role},"secretKey", {expiresIn:60*15}); //generate token
        const refreshToken = jwt.sign({id:payload.id, username: payload.username, role:payload.role},"secretRefreshKey",{expiresIn:60*60*24});//generate refreshToken
        res.cookie('refreshToken', refreshToken, {httpOnly:true});
        res.status(200).json({
            username: payload.username,
            role:payload.role,
            accessToken,
            msg:"Token has been refreshed"
        });

    });
    }catch(error){
        console.log(error);
        res.status(401).json({errorMsg:"something wrong when creating new token or sending it as new cookie"})
    }
}

//3. Fungsi Logout
// 
const logout = (req, res) => {
    const refreshToken = req.cookies;
    res.clearCookie('refreshToken', {httpOnly:true });
    res.status(200).json(`refresh Token Cookies ${refreshToken} has been cleared`);
    console.log(`refresh Token Cookies ${refreshToken} has been cleared`);

}

export {login, refresh, logout}