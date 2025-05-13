import express from 'express';
import {getMunicipiosById,createMunicipio,getMunicipios} from '../controllers/municipios.js';
import { validateMunicipio } from '../middleware/validations.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getMunicipios);

router.get('/:id', auth, getMunicipiosById);

router.post('/', validateMunicipio,createMunicipio);

export default router;