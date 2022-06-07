import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const decompress = async () => {
    const read = fs.createReadStream(path.join(__dirname, 'files', 'archive.gz'));
    const write = fs.createWriteStream(path.join(__dirname,'files','fileToCompress2.txt'));
    const gzip = zlib.createGunzip();
    read.pipe(gzip).pipe(write);
};
decompress()