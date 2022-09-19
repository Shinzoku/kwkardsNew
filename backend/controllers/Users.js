import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get users all
export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes:['id','pseudo','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// Account creation
export const Register = async(req, res) => {
    const { pseudo, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            pseudo: pseudo,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

// Account login
export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                pseudo: req.body.pseudo
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const pseudo = user[0].pseudo;
        const accessToken = jwt.sign({userId, pseudo}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, pseudo}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}

// Account logout
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}