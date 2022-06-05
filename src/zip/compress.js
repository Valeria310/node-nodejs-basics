import fs from 'fs'
import commonjsVariables from 'commonjs-variables-for-esmodules'
import path from 'path';
import zlib from 'zlib';

const {
    __dirname
} = commonjsVariables(import.meta)

export const compress = async () => {
    const read = fs.createReadStream(path.join(__dirname,'files','fileToCompress.txt'), 'utf-8');
    const write = fs.createWriteStream(path.join(__dirname, 'files', 'archive.gz'));
    const gzip = zlib.createGzip();
    read.pipe(gzip).pipe(write);
};
compress()

