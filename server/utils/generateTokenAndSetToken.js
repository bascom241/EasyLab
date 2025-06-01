import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const generateTokenAndSetCookie = (res, user) => {
    const token = jwt.sign({userId:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:"7days"})

    res.cookie("token", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
         sameSite:"none",
        maxAge:7*24*60*60*1000
    })
}

export default generateTokenAndSetCookie