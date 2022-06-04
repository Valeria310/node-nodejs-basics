import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)

export const list = async () => {
    fs.readdir(path.join(__dirname, 'files'), (err, data)=>{
        if(err) {
            throw new Error('FS operation failed')
        }
        console.log(data)
    })
};
list()