import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const copy = async () => {
    fs.access(path.join(__dirname, 'files'), fs.F_OK, (err)=>{
        if(err) throw new Error('FS operation failed')
    })
    fs.readdir(path.join(__dirname, 'files'), (err, data)=>{
        if(err) {
            throw new Error('FS operation failed')
        }
        fs.mkdir(path.join(__dirname, 'files_copy'), err=>{
            if(err) {
                throw new Error('FS operation failed')
            }
            data.forEach(el => {
                fs.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files_copy', el), err=>{
                    if(err) throw err
                })
            })
        })
    })
};
copy();