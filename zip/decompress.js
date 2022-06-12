import fs from 'fs';
import zlib from 'zlib';
import {stdout as output} from 'process';
import { pipeline } from 'stream';
import {showInfo} from'../shared.js';
import {rmFile} from '../basic/rm.js';
import { errorText } from '../script.js';

export const decompress = (data) => {
    const pathToFile = data.slice(0, data.indexOf(' ')); 
    const pathToDestination = data.slice(data.indexOf(' ')+1); 
    fs.access(pathToDestination,  (err) => {
        if(!err) {
            output.write(errorText);
            showInfo();
        } else {
            const read = fs.createReadStream(pathToFile);
            const write = fs.createWriteStream(pathToDestination);
            const brotliDecompress = zlib.createBrotliDecompress();
            fs.access(pathToFile, (err) => {
                if(err) {
                    output.write(errorText);
                    showInfo();
                }
                else{
                    pipeline(read, brotliDecompress, write, err => {
                        if(err) output.write(errorText);
                        rmFile(pathToFile);
                    });
                }
            })
        }
    })
}