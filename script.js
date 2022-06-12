import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import crypto from 'crypto';
import zlib from 'zlib';
import {stdin as input, stdout as output, chdir} from 'process';
import { pipeline } from 'stream';
import {showInfo} from'./shared.js';
import {up} from './nwd/up.js';
import {cd} from './nwd/cd.js';
import {ls} from './nwd/ls.js';
import {cat} from './basic/cat.js';
import {add} from './basic/add.js';
import {rn} from './basic/rn.js';
import {cpFile} from './basic/cp.js';
import {mv} from './basic/mv.js';
import {rmFile} from './basic/rm.js';
import {osFunc} from './os/os.js';
import {hash} from './hash/hash.js'

export const errorText = 'Operation failed\n';
const readLine = readline.createInterface({input, output});
const userName = process.argv[2].slice(process.argv[2].indexOf('=')+1);

const exit = () => {
    output.write(`Thank you for using File Manager, ${userName}!`);
    output.end();
    readLine.close();
}

const compress = async (data) => {
    const pathToFile = data.slice(0, data.indexOf(' ')); 
    const pathToDestination = data.slice(data.indexOf(' ')+1); 
    fs.access(pathToDestination,  (err) => {
        if(!err) {
            output.write('1');
            showInfo();
        } else {
            const read = fs.createReadStream(pathToFile);
            const write = fs.createWriteStream(pathToDestination);
            const brotliCompress = zlib.createBrotliCompress();
            fs.access(pathToFile, (err) => {
                if(err) {
                    output.write('2');
                    showInfo();
                }
                else{
                    pipeline(read, brotliCompress, write, err => {
                        if(err) output.write('3');
                        rmFile(pathToFile);
                    });
                }
            })
        }
    })
}

const decompress = (data) => {
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

readLine.on('line', async input => {
    if(input==='.exit') {
        exit();
    } else if(input==='up') {
        up();
        showInfo();
    } else if(input.slice(0,2)==='cd') {
        cd(input.slice(3));
    } else if(input==='ls') {
        ls();
    } else if(input.slice(0,3)==='cat') {
        cat(input.slice(4));
    } else if(input.slice(0,3)==='add') {
        add(input.slice(4));
    } else if(input.slice(0,2)==='rn') {
        rn(input.slice(3));
    } else if(input.slice(0,2)==='cp') {
        cpFile(input.slice(3));
    } else if(input.slice(0,2)==='mv') {
        mv(input.slice(3));
    } else if(input.slice(0,2)==='rm') {
        rmFile(input.slice(3));
    } else if(input.slice(0,4)==='hash') {
        hash(input.slice(5));
    } else if(input.slice(0, 8)==='compress') {
        compress(input.slice(9));
    }else if(input.slice(0, 10)==='decompress') {
        decompress(input.slice(11));
    }else if(input.slice(0,2)==='os') {
        osFunc(input.slice(5));
    } else {
        output.write('Invalid input\n');
        showInfo();
    }
})

readLine.on('SIGINT', () => {
    exit()
})

output.write(`Welcome to the File Manager, ${userName}!\n`);
chdir(os.homedir());
showInfo();