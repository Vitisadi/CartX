import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);
const __dirname = dirname(__filename);

router.put(`/${parsed.name}`, (req, res) => {
  const storeName = req.body.store;
  console.log(storeName);

  const directoryPath = path.join(__dirname, 'storage', storeName);
  console.log(directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }

    Promise.all(files.map(file => {
      return fs.promises.readFile(path.join(directoryPath, file), 'utf8').then(content => {
        return { name: path.parse(file).name, data: JSON.parse(content) };
      });
    })).then(contents => {
      const storeData = { [storeName]: {} };
      contents.forEach(item => {
        storeData[storeName][item.name] = item.data;
      });
      res.json(storeData);
    }).catch(readError => {
      res.status(500).send('Error reading files');
    });
  });
});

export default router;