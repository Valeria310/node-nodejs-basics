import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const compress = async () => {
    const read = fs.createReadStream(path.join(__dirname,'files','fileToCompress.txt'), 'utf-8');
    const write = fs.createWriteStream(path.join(__dirname, 'files', 'archive.gz'));
    const gzip = zlib.createGzip();
    read.pipe(gzip).pipe(write);
};
compress()

