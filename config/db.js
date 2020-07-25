//Aca vamos a hacer las conecciones a la base de datos

const mongoose = require('mongoose');

//llamo a la coneccion con la BD de manera asincronica
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB conectada ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1); //Si hay un error finalizo
    }

}

module.exports = connectDB;