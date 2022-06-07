import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const read = async () => {
    fs.readFile(path.join(__dirname, 'files', 'fileToRead.txt'), 'utf-8', (err, data) => {
        if(err) throw new Error('FS operation failed')
        console.log(data)
    })
};
read()