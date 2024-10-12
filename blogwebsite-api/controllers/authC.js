import { db } from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = (req,res) => {
    //check user exist 
    const q = "SELECT * FROM user WHERE username = ?"

    db.query(q,[req.body.username],(err,data) => {
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json("kullanıcı bulunamadı!")
        
        //checked password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect){
            return res.status(400).json("şifre yanlış")
        }

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const {password, ...other} = data[0]

        
        res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json(other);
       
    })
}

export const register = (req,res) => {
   

    //check user exist
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"

    db.query(q,[req.body.email,req.body.username], (err,data) => {
        if (err) return res.json(err)
        if(data.length) return res.status(409).json("Bu kullanıcı zaten var!")


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(`username`,`email`,`password`,`img`) VALUES (?)"

        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.img || "img"
        ]
 
        db.query(q,[values],(err,date) => {
            if (err) return res.json(err)
           return res.status(200).json("Kullanıcı oluşturuldu")
        })
      
    })
}

export const logout = (req,res) => {
     console.log("logout")
     res.clearCookie("access_token", {
        path: "/api/auth/logout", 
        sameSite: "none",
        secure: true
    })
    .status(200).json("kullanıcı çıkış yaptı")
}