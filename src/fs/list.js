import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const list = async () => {
    fs.readdir(path.join(__dirname, 'files'), (err, data)=>{
        if(err) {
            throw new Error('FS operation failed')
        }
        console.log(data)
    })
};
list()