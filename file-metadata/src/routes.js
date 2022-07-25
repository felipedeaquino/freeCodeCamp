import path from 'path';
import { Router } from 'express';
export const routes = Router();
import {fileURLToPath} from 'url';
import multer from 'multer';
const upload = multer({ dest: './uploads/' })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, path.sep, '..', path.sep, 'views', path.sep, 'index.html'));
});

routes.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { size } = req.file
  return res.status(200).json({ name: req.file.originalname, type: req.file.mimetype, size })
})