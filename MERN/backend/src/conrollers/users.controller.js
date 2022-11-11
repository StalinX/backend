import { User } from "../models/users.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userCrtl = {}
userCrtl.register = async (req, res) => {
    try {
        const data = req.body;
        //console.log(data);
        //res.json({ok:true,message:"", data})

        // --  
        const existUser = await User.findOne({ correo: data.correo });
        if (existUser) {
            return res.status(400).json({
                ok: false,
                message: "El mail existe"
            })
        }

        //encriptar contraseña
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await User.create(data);
        //crear token
        const token = jwt.sign({ _id: newUser._id }, "secret");

        res.status(201).json({
            ok: true,
            message: "Usuario creado correctamente",
            data: { ...newUser._doc, token },

        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
        })

    }

userCrtl.login = async (req,res)=>{
    try {
        const data=res.body
        const existUser=await User.findOne({correo:data.correo})
        if (!existUser) {
            return res.status(400).json({
                ok:false,
                message: "El correo no existe"
            });
        
        } 

        const match = await bcrypt.compare(data.password,existUser.password)
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
        })
    }
}
};

export default userCrtl