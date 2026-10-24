const express = require('express');
const path = require('path');

const app = express();
const PORT = 5003;
//Publicamos los archivos del servidor

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Servidor activo http://localhost:${PORT}`);
});