import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)

export const rename = async () => {
    fs.access(path.join(__dirname, 'files', 'properFilename.md'), err=>{
        if(!err) throw new Error('FS operation failed') 
    })
    fs.rename(path.join(__dirname, 'files', 'wrongFilename.txt'), path.join(__dirname, 'files', 'properFilename.md'), err =>{
        if(err) throw new Error('FS operation failed')
    })
};
rename()