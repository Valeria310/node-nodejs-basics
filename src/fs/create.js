import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const create = async () => {
    fs.access(path.join(__dirname, 'files', 'fresh.txt'), fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(path.join(__dirname, 'files', 'fresh.txt'), 'I am fresh and young', err=>{
                    if(err) {
                        console.error(err)
                    }
                })  
        } else {
            throw new Error('FS operation failed');
        }
    })
};
create();