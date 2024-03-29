const User = require("../model/userModel")
const brcypt = require("bcrypt")
module.exports.register = async (req,res,next) => {
    try {
        const {username, email, password} = req.body
        const usernameCheck = await User.findOne({username})
        if (usernameCheck) {
            return res.json({msg: "Username already used", status:false})
        }
        const emailCheck = await User.findOne({email})
        if (emailCheck) {
            return res.json({msg:"email already used",status:false})
        }
        const hashedPassword = await brcypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password:hashedPassword
        })
        
        delete user.password
        return res.json({status:true, user})
    }
    catch(er) {
        next(er)
    }
}

module.exports.login = async (req,res,next) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.json({msg: "incorrect username or password", status:false})
        }

        const isPasswordValid = await brcypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.json({msg: "incorrect username or password", status:false})
        }
        
        delete user.password
        return res.json({status:true, user})
    }
    catch(er) {
        next(er)
    }
}


module.exports.getAllUsers = async (req,res,next) =>{
    
    try {
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "_id"
        ])
        return res.json(users)
    }

    catch(ex) {
        next(ex)
    }
}
