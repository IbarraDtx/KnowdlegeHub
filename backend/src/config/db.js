const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    console.log('MONGO_URI:', process.env.MONGO_URI);

    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa');
    } catch(error) {
        console.log('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;