import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const remove = async () => {
    fs.unlink(path.join(__dirname, 'files', 'fileToRemove.txt'), err=>{
        if(err) throw new Error('FS operation failed')
    })
};
remove()