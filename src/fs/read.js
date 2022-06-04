import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)

export const read = async () => {
    fs.readFile(path.join(__dirname, 'files', 'fileToRead.txt'), 'utf-8', (err, data) => {
        if(err) throw new Error('FS operation failed')
        console.log(data)
    })
};
read()