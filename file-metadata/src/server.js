import dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app
  .use(routes)
  .use(express.static(path.join(__dirname, path.sep, '..', path.sep, 'public')));

const port = process.env["PORT"] || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
