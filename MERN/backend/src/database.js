import mongoose from "mongoose";

const URI = 'mongodb://localhost/pruebaMaestra';

const connectDB=async()=>{
    try {
        const db = await mongoose.connect(URI);
        console.log('conectado', db.connection.name);
    } catch (error) {
        console.log('no conectado', error.message);
    }
}

export default connectDB