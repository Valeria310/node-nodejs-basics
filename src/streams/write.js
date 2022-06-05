import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)

export const write = async () => {
    const writebleStream = fs.createWriteStream(path.join(__dirname,'files','fileToWrite.txt'));
    process.stdin.on('data', function(data) {
        writebleStream.write(data)
    })
};
write()