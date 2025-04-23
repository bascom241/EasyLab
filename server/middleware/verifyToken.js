import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const verifyToken = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message:"Token is missing"});


    const secret = process.env.JWT_SECRET;
    if(!secret) return res.status(401).json({message:"invalid token"})
    const decoded = jwt.verify(token, secret);
    
    req.user= decoded;

    next();

})

export default verifyToken