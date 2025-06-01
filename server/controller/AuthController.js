import User from "../models/userSchema.js";
import { validateFields } from "../utils/validator.js";
import asyncHandler from "express-async-handler"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetToken.js";
import bcrypt from 'bcryptjs';
import { sendEmail, sendPasswordResetEmail, sendResetSuccessfullEmail } from "../utils/sendEmails.js";
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const register = asyncHandler(async (req, res) => {
    const requiredFields = [
        "fullName",
        "email",
        "password",
        "facilityName",
        "facilityNumber",
        "role",
        "departmentName",
        "phoneNumber",
    ]

    const { fullName, email, password, facilityName, facilityNumber, role, departmentName, phoneNumber } = req.body;

    console.log(fullName, email, password, facilityName, facilityNumber, role, departmentName, phoneNumber)
    if (!validateFields(req.body, requiredFields)) {
        return res.status(403).json({ message: "All field are required" })
    }
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ message: "User Already Exits" });

    const hashPassword = await bcrypt.hash(password, 8);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedToken = await bcrypt.hash(verificationToken, 6);
    const user = new User({
        fullName,
        password: hashPassword,
        email,
        facilityName,
        facilityNumber,
        role,
        departmentName,
        phoneNumber,
        verificationToken: hashedToken,
        verificationTokenExpiresDate: Date.now() + 24 * 60 * 60 * 1000

    })
    await user.save();
    generateTokenAndSetCookie(res, user);
    await sendEmail(email, verificationToken, fullName);
    res.status(201).json({ success: true, user })

})
const editUser = asyncHandler(async (req, res) => {
    const { id } = req.params;


    // Validate request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "No update data provided"
        });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
                runValidators: true,
                context: 'query' // Ensures validators run with the update
            }
        );

        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User profile updated successfully"
        });

    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: "Server error while updating user",
            error: error.message
        });
    }
});
const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(403).json({ success: false, message: "Verification code is required" });

    const user = await User.findOne({
        verificationToken: { $exists: true },
        verificationTokenExpiresDate: { $gte: Date.now() }
    });

    if (!user) return res.status(403).json({ sucess: false, message: "Token Expired" });

    const isMatch = await bcrypt.compare(code, user.verificationToken);
    if (!isMatch) return res.status(403).json({ success: false, message: "Invalid Token" })

    user.isVerified = true;
    user.verificationTokenExpiresDate = undefined;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ success: true, message: "User Verified" })

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(401).json({ message: "Email or Password is reqiured" })

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User does not exist" })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
        return res.status(401).json({ message: "Email or password is Invalid" })

    const token = generateTokenAndSetCookie(res, user);
    console.log(user)

    user.lastLogin = Date.now();
    await user.save();
    res.status(200).json({ token , user,  success: true, message: "User Logged in successfully" })


})


const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successfully" })
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ message: "user does not exits" });

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresDate = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresDate = resetPasswordExpiresDate;

    await user.save();

    await sendPasswordResetEmail(email, user.fullName, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

    res.status(200).json({ success: true, message: `Reset Password sent to ${email}` });

})

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresDate: { $gte: Date.now() } });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const hashpassword = await bcrypt.hash(password, 8);
    user.password = hashpassword;
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresDate = undefined;
    await user.save();

    await sendResetSuccessfullEmail(user.email)
    res.status(200).json({ message: "password reset succesfully" })

})

const checkAuth = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId).select("-password");
        console.log("User:", user);
        if (!user) return res.status(401).json({ message: "User not found" });

        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export { register, verifyEmail, login, forgotPassword, resetPassword, checkAuth, logout, editUser }






