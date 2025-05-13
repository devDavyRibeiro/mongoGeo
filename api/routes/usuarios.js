import express from 'express';
import {efetuaLogin, InsereUsuario} from '../controllers/usuarios.js';
import { validateUsuario } from '../middleware/validations.js';

const router = express.Router();

router.post('/',validateUsuario,InsereUsuario)

router.post('/login', efetuaLogin)

export default router