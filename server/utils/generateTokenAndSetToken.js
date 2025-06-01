import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateTokenAndSetCookie = (res, user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Using "7d" instead of "7days" for consistency
    );

    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax", // Use "lax" in development for better local testing
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain: isProduction ? ".onrender.com" : undefined, // Set domain in production
        path: "/", // Ensure cookie is sent for all paths
    });

    // For debugging purposes (remove in production)
    console.log(`Cookie set with options:`, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        domain: isProduction ? ".onrender.com" : undefined,
        path: "/"
    });

    return token; // Return the token in case you need it for other purposes
};

export default generateTokenAndSetCookie;