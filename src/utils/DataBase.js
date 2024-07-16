const mongoose = require('mongoose');

(async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,)
        console.log("Conectado a la base de datos", db.connection.name);
    }
    catch (error) {
        console.error('Conexion a la BD fallida: ', error.message);
    }
}
)();