import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)
export const remove = async () => {
    fs.unlink(path.join(__dirname, 'files', 'fileToRemove.txt'), err=>{
        if(err) throw new Error('FS operation failed')
    })
};
remove()