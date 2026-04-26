const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

async function registerUser (req,res){
    const { email, username, password } = req.body

    if (!email || !username || !password) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            { email },
            { username }
        ]
    })

    if(isAlreadyRegistered)
    {
        return res.status(400).json({
            message: "User with same email address or Username already Exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("token", token)

    return res.status(201).json({
        message: "User Registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function loginUser (req,res){
    const { identifier, password } = req.body
    
    if (!identifier || !password) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    const isEmail = identifier.includes("@");

    const query = isEmail ? { email: identifier } : { username: identifier };
    
    const user = await userModel.findOne(query).select("+password");

    // const user = await userModel.findOne({
    //     $or:[
    //         { email },
    //         { username }
    //     ]
    // }).select("+password")

    if(!user)
    {
        return res.status(400).json({
            message: "Invalid Credentials"
            //why we are not saying  USER NOT FOUND here (Ask ChatGPT)
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
    {
        return res.status(400).json({
            message: "Invalid Credentials"
            //why we are not saying INCORRECT PASSWORD here (Ask ChatGPT)
        })
    }
    
    const token = jwt.sign({
        id: user._id,
        username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "3d" }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User Logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getMe(req,res){
    //const user = await userModel.findById(req.user.id).select("-password")
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User Fetched Sucessfully",
        user
    })
}

async function logoutUser(req,res) {

    const token = req.cookies.token
    res.clearCookie("token")

    await redis.set(token, Date.now().toString(),"EX", 60*60)
    res.status(200).json({
        message:"Logout Successfully."
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}