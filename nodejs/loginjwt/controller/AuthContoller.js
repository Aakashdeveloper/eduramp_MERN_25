const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/UserSchema');
const router = express.Router();

const refreshToken = new Set()

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//list all users
router.get('/users',async(req,res) => {
    let data = await User.find({});
    res.send(data)
})

//register User
router.post('/register',async(req,res) => {
    try{
        const hashpassword = await bcrypt.hashSync(req.body.password,8)

        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword,
            phone:req.body.phone,
            role:req.body.role?req.body.role:'User'
        })

        res.status(200).send('Registration Successful')

    }catch(err){
        console.log(err);
        res.status(500).send("Registration Failed")
    }
});

//loginUser
router.post('/login',async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(403).send({auth:false,token:'No User Found register First'})
        }

        //compare password
        const passIsValid = await bcrypt.compareSync(req.body.password,user.password)

        if(!passIsValid){
            return res.status(403).send({auth:false,token:'Invalid Password'})
        }

        //generate token
        const token = jwt.sign({id:user._id},config.secert,{expiresIn:'10m'})
        const refreshToken = jwt.sign({id:user._id},config.refreshSecert,{expiresIn:'2m'})
        refreshToken.padEnd(refreshToken)
        res.status(200).send({auth:true,token})

    }catch(err){
        console.log(err);
        res.status(500).send({auth:false,token:'There was a problem with login'})
    }
})

//refresh token
router.post('/refreshToken',async(req,res) => {
    const {refreshToken} = req.body;
    if(!refreshToken || !refreshToken.has(refreshToken)){
        res.status(500).send({auth:false,token:'No Refresh token found'})
    }

    try{
        const decode = await jwt.verify(refreshToken,config.refreshSecert);
       const newRefreshToken = jwt.sign({id:user._id},config.refreshSecert,{expiresIn:'2m'});
       refreshToken.delete(refreshToken)
       refreshToken.add(newRefreshToken)

       res.status(200).send({auth:true,token:newRefreshToken})
    }catch(err){
        console.log(err);
        res.status(500).send({auth:false,token:'Error While fetching user'})
    }


})

router.get('/userInfo',async(req,res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({auth:false,token:'No Token Found'})
    }
    try{
        const decode = await jwt.verify(token,config.secert);
        console.log(decode)
        const user = await User.findById(decode.id).select('-password');
        if(!user){
            res.status(403).send({auth:false,token:'No User Found'})
        }

        res.send(user)
    }catch(err){
        console.log(err);
        res.status(500).send({auth:false,token:'Error While fetching user'})
    }
})


module.exports = router