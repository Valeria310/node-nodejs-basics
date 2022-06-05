import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';
import zlib from 'zlib';

const {
    __dirname
} = commonjsVariables(import.meta)

export const decompress = async () => {
    const read = fs.createReadStream(path.join(__dirname, 'files', 'archive.gz'));
    const write = fs.createWriteStream(path.join(__dirname,'files','fileToCompress2.txt'));
    const gzip = zlib.createGunzip();
    read.pipe(gzip).pipe(write);
};
decompress()