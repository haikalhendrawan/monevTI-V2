import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//1. Fungsi Login
// --cari user di database, kalo gaada catch error. Kemudian compare password hashnya pakai bcrypt.compare(req.password, db.password).
//   kalo oke lanjut buat token pakai jwt.sign({payload}, secretKey, {expiresIn}). Kirim refreshToken pakai res.Header('Set-Cookie', 'name=value;HttpOnly')
//   handle accessTokennya di frontEnd pakai variable/browser memory
const login = async (req, res) => {
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const{username, password}=req.body;
        const q = "SELECT * FROM user WHERE username = ?";
        
        const [rows] = await connection.execute(q, [username]);
        const hashedPassword = rows[0].password_hash;
        const match = await bcrypt.compare(password, hashedPassword);
        
        if(match){
            const q2 = "INSERT INTO login(var) VALUES (?)";
            const log = 0;
            await connection.execute(q2, [log]);
            await connection.commit();
            const accessToken = jwt.sign({id:rows[0].user_id, username:rows[0].username, name:rows[0].name, email:rows[0].email, image:rows[0].image, role:rows[0].role, kppn:rows[0].kppn, periode:rows[0].periode, namaPIC:rows[0].nama_pic, nipPIC:rows[0].nip_pic, emailPIC:rows[0].email_pic},"secretKey", {expiresIn:60*60*12}); //generate token
            const refreshToken = jwt.sign({id:rows[0].user_id, username:rows[0].username, name:rows[0].name, email:rows[0].email, image:rows[0].image, role:rows[0].role, kppn:rows[0].kppn, periode:rows[0].periode, namaPIC:rows[0].nama_pic, nipPIC:rows[0].nip_pic, emailPIC:rows[0].email_pic},"secretRefreshKey",{expiresIn:60*60*24});//generate refreshToken
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`);
            res.status(200).json({
                id:rows[0].user_id,
                username:rows[0].username,
                name:rows[0].name,
                email:rows[0].email,
                image:rows[0].image,
                role:rows[0].role,
                kppn:rows[0].kppn,
                periode:rows[0].periode,
                namaPIC:rows[0].nama_pic,
                nipPIC:rows[0].nip_pic,
                emailPIC:rows[0].email_pic,
                accessToken,
                msg:"Login Sucess"
            });
        }else{
            await connection.commit();
            return res.status(401).json({errorMsg:"Invalid Password"});
        }
    }catch(error){
        await connection.rollback();
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
    }finally{
        connection.release()
    }
}


//2. Fungsi refresh Token 
// --untuk verify accessToken di Middleware, utk verify refreshToken disini. Payload RefreshToken bentuknya {id:xx, username:xx, role:,..} ---
const refresh = (req, res) => {  
    try{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
          return res.status(401).json("no token")};
        
      jwt.verify(refreshToken, "secretRefreshKey",(err, payload)=>{
          if(err){console.log(err); res.status(401).json({errorMsg:"invalid token"})};
          const accessToken = jwt.sign({id:payload.id, username:payload.username, name:payload.name, email:payload.email, image:payload.image, role:payload.role, kppn:payload.kppn, periode:payload.periode, namaPIC:payload.namaPIC, nipPIC:payload.nipPIC, emailPIC:payload.emailPIC},"secretKey", {expiresIn:60*60*12}); //generate token
          const refreshToken = jwt.sign({id:payload.id, username:payload.username, name:payload.name, email:payload.email, image:payload.image, role:payload.role, kppn:payload.kppn, periode:payload.periode, namaPIC:payload.namaPIC, nipPIC:payload.nipPIC, emailPIC:payload.emailPIC},"secretRefreshKey",{expiresIn:60*60*24});//generate refreshToken
          res.cookie('refreshToken', refreshToken, {httpOnly:true});
          res.status(200).json({
              id:payload.id,
              username:payload.username,
              name:payload.name,
              email:payload.email,
              image:payload.image,
              role:payload.role,
              kppn:payload.kppn,
              periode:payload.periode,
              namaPIC:payload.namaPIC,
              nipPIC:payload.nipPIC,
              emailPIC:payload.emailPIC,
              accessToken,
              msg:"Token has been refreshed"
          })
      });
    }catch(error){
        console.log(error);
        return res.status(401).json({errorMsg:"something wrong when creating new token or sending it as new cookie"})
    }

}

//3. Fungsi Logout
const logout = (req, res) => {
    const refreshToken = req.cookies;
    res.clearCookie('refreshToken', {httpOnly:true });
    console.log(`refresh Token Cookies ${JSON.stringify(refreshToken)} has been cleared`);
    return res.status(200).json({msg:`User logged out, refresh Token Cookies has been cleared`});
}

//4. Fungsi generate new access Token -> ketika ada update data user di DB
const updateToken = async (req, res) => {
    try{
        if(!req.body){return res.status(400).json({errMsg:'error updating data'})}
            const {id, username, name, email, image, role, kppn, periode, namaPIC, nipPIC, emailPIC} = req.body;
            const accessToken = jwt.sign({id:id, username:username, name:name, email:email, image:image, role:role, kppn:kppn, periode:periode, namaPIC:namaPIC, nipPIC:nipPIC, emailPIC:emailPIC},"secretKey", {expiresIn:60*60*12}); //generate token
            const refreshToken = jwt.sign({id:id, username:username, name:name, email:email, image:image, role:role, kppn:kppn, periode:periode, namaPIC:namaPIC, nipPIC:nipPIC, emailPIC:emailPIC},"secretRefreshKey",{expiresIn:60*60*24});//generate refreshToken
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`);
            res.status(200).json({
                id:id, 
                username:username, 
                name:name, 
                email:email, 
                image:image, 
                role:role, 
                kppn:kppn, 
                periode:periode, 
                namaPIC:namaPIC, 
                nipPIC:nipPIC, 
                emailPIC:emailPIC,
                accessToken,
                msg:"Token has been updated"
            });
    }catch(err){
        console.log(err);
    }
}

export {login, refresh, logout, updateToken}