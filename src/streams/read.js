import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const read = async () => {
    const readebleStream = fs.createReadStream(path.join(__dirname,'files','fileToRead.txt'));
    readebleStream.on('data', chunk => process.stdout.write(chunk));
};
read()