import express from 'express';
import {config} from 'dotenv';
import fs from 'fs';
import {connectToDatabase} from './config/db.js';
import municipiosRoutes from './routes/municipios.js';
import usuariosRoutes from './routes/usuarios.js';

config();
const app = express();
app.use(express.json()); //parse da JSON --> força o express a trabalhar com Json
const PORT = process.env.PORT || 3000;
app.use('/', express.static('public')) //rota pública
app.use('/api/municipios', municipiosRoutes);
app.use('/api/usuarios',usuariosRoutes )

app.use('/favicon.ico', express.static(';public/images/logo.png')); //define o favicon

connectToDatabase(app).then(()=>{
    app.listen(PORT ,() => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})

