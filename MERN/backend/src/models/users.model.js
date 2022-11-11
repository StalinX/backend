import mongoose from "mongoose";
const {Schema, model}=mongoose

const userSchema = new Schema({
    nombre:{
        type:String,
        requerid:true
    },
    correo: {
        type: String,
        requerid: true,
        unique: true,
    },
    password: {
        type: String,
        requerid: true,
    },
},
{
    timestamps: true,
}

);

export const User = model('usuario', userSchema);


