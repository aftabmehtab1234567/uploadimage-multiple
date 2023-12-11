import express from 'express';
const router = express.Router();
import { Upload, handleAction } from '../Controller/Controller.js';

router.post('/upload', Upload.array('file[]'), handleAction);


export default router;
