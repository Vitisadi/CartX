import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Dynamically import route files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDirectory = path.join(__dirname, 'routes');

fs.readdir(routesDirectory, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach((file, index) => {
    import(`./routes/${file}`).then((router) => {
      app.use('/', router.default);
    });
  });
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
