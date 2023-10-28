const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function sadeceHarfleriSec(string) {
    // Sadece harf karakterlerini içerecek bir boş bir string oluşturun
    var harfString = '';
  
    // String üzerinde dönerek her karakterin harf olup olmadığını kontrol edin
    for (var i = 0; i < string.length; i++) {
      var karakter = string.charAt(i);
      if (karakter.match(/[a-zA-Z]/)) {
        // Eğer karakter bir harfse, harfString'e ekleyin
        harfString += karakter;
      }
    }
  
    return harfString;
  }
const register = async (req,res,next) => {
    try {
        const date = new Date();
        const {name , lastname, email , password} = req.body;

        const min = 10;
        const max = 99;
        const rastgele = Math.floor(Math.random() * (max - min + 1)) + min;

        const username = sadeceHarfleriSec(name+lastname) + String(rastgele)
        

        const cryrptedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            name, lastname, email ,username, password: cryrptedPassword,joinedDate: date
        })

        console.log(user);
        const token = jwt.sign({ _id: user._id,
            name: user.name,
            lastName: user.lastname,
            email: user.email,
            username: user.username,
            _id: user._id
         }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
        
        res.status(200).json({
            success: true,
            user,
            token

        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
        
    }



}



const login = async (req,res,next) => {
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({
                success: false,
                message: "Böyle Bir kullanıcı bulunamadı"
            })
        }
        else{

            if (await bcrypt.compare(password, user.password)){
    
                const token = jwt.sign({ _id: user._id,
                    name: user.name,
                    lastName: user.lastname,
                    email: user.email,
                    username: user.username,
                    _id: user._id
                 }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
                res.status(200).json({
                    success: true,
                    user,
                    token
        
                })

            }
            else{
                res.status(400).json({
                    success: false,
                    message: "Şifre Yanlış"
                })
            }

    

        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
        
    }



}





const getUserInfo = async (req,res,next) => {
    try {

        const user = await User.findOne({email:req.user.email})

        if(!user){
            res.status(404).json({
                success: false,
                message: "Böyle Bir kullanıcı bulunamadı"
            })
        }
        else{

                res.status(200).json({
                    success: true,
                    user,
        
                })

    

        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
        
    }



}


module.exports = {
    register,
    login,
    getUserInfo
}