import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)


export const copy = async () => {
    fs.access(path.join(__dirname, 'files'), fs.F_OK, (err)=>{
        throw new Error('FS operation failed')
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
                copyFile(path.join(__dirname, 'files2', el), path.join(__dirname, 'files_copy', el), err=>{
                    if(err) throw err
                })
            })
        })
    })
};
copy();