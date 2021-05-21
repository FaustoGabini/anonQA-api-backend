const mongoose = require("mongoose");

const connectionString = process.env.MONGO_DB_URL;

// conexion a mongodb

mongoose
  .connect(connectionString, {
    // Configuracion
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error(error);
  });
