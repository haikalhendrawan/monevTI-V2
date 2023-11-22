import jwt from"jsonwebtoken";

//Middleware untuk memastikan yg request memiliki token (minimal user biasa)
const authenticate= (req, res, next)=>{               
    const headerReceived= req.headers.authorization;  // headerReceived bentuknya kyk gini: Bearer ajnqwonqwojnrqwj21309123212121   
    if(headerReceived){
        const token = headerReceived.split(" ")[1];  // extract tokennya aja
        jwt.verify(token, "secretKey", (err, payload)=>{
            if(err){
                console.log(err);
                return res.status(401).json({errMsg:"Idle for too long, please refresh the page or re-log in"});
            };
            req.payload=payload; 
            next(); 
        });
    }else{
        return res.status(401).json({errMsg:"not authenticated"})
    }
}

export default authenticate;