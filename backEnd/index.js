import express from "express";
import jwt from"jsonwebtoken";

const app = express();
const refreshTokenData =[];

app.use(express.json());

const dataBase = [
{
    username:"user1",
    password:"123",
    isAdmin:true
},
{
    username:"user2",
    password:"abc",
    isAdmin:false
},
{
    username:"admin",
    password:"admin",
    isAdmin:true
}
];

const authenticate=(req, res, next)=>{
    const headerReceived= req.headers.authorization;  //headerReceived bentuknya kyk gini: Bearer ajnqwonqwojnrqwj21309123212121
    if(headerReceived){
        const token = headerReceived.split(" ")[1];  //extract tokennya aja
        jwt.verify(token, "secretKey", (err, payload)=>{
            if(err){console.log(err)};
            req.payload=payload;
        });

        next();
    }else{
        res.status(401).json("not authenticated")
    }

}


app.post("/login", (req, res)=>{
    const{username, password}=req.body;
    const userData = dataBase.find((user)=>{     //userData menghasilkan output username, pass, dan isAdmin yg match
        return (user.username===username && user.password===password)
    });

    if(userData){
        const accessToken = jwt.sign({id:userData.username, isAdmin:userData.isAdmin},"secretKey", {expiresIn:60*1}); //generate token
        const refreshToken = jwt.sign({id:userData.username, isAdmin:userData.isAdmin},"secretRefreshKey",{expiresIn:60*60*24});//generate refreshToken
        refreshTokenData.push(refreshToken);
        res.json({
            username: userData.username,
            isAdmin: userData.isAdmin,
            accessToken,
            refreshToken
        });
    }else{
        res.status(401).json("you are unauthorized");
    }
})


app.post("/refresh", (req, res)=>{
    //take the refresh token from request
    const refreshToken = req.body.token;

    //send error if no token or invalid token
    if(!refreshToken){res.status(401).json("no token")};
    if(!refreshTokenData.includes(refreshToken)){
        res.status(403).json("token invalid")
    }

    jwt.verify(refreshToken, "secretRefreshKey",(err, payload)=>{
        if(err){console.log(err)};
        refreshTokenData.filter((token)=>{  //delete existing refresh token
            return token!==refreshToken;
        })
    
        ////if nothing wrong then to this
        const newAccessToken = jwt.sign({id:payload.username, isAdmin:payload.isAdmin}, "secretKey",{expiresIn:60*1});//create new token
        const newRefreshToken = jwt.sign({id:payload.username, isAdmin:payload.isAdmin},"secretRefreshKey",{expiresIn:60*60*24});//create new refresh token
        refreshTokenData.push(newRefreshToken);

        res.status(200).json({
            user:payload.username,
            isAdmin:payload.isAdmin,
            token:newAccessToken,
            refreshToken:newRefreshToken
        })

    });



})

app.get("/cekToken", authenticate, (req, res)=>{
    if(req.payload.isAdmin){
        res.json("you are an admin")
    }else{
        res.json("you are not an admin")
    }
})

app.get("/logout", authenticate, (req, res)=>{

    ///simply delete the token in the client cookies and delete refresh token
})


app.listen('3001', ()=>{
    console.log("app running on port 3001")
})