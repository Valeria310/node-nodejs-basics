import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';

const {
    __dirname
} = commonjsVariables(import.meta)

export const read = async () => {
    const readebleStream = fs.createReadStream(path.join(__dirname,'files','fileToRead.txt'));
    readebleStream.on('data', chunk => process.stdout.write(chunk));
};
read()