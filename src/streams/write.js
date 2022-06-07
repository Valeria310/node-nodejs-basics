import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const write = async () => {
    const writebleStream = fs.createWriteStream(path.join(__dirname,'files','fileToWrite.txt'));
    process.stdin.on('data', function(data) {
        writebleStream.write(data)
    })
};
write()