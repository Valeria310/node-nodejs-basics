import os from 'os';
import readline from 'readline';
import {stdin as input, stdout as output, chdir} from 'process';
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
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';

export const errorText = 'Operation failed\n';
const readLine = readline.createInterface({input, output});
const userName = process.argv[2].slice(process.argv[2].indexOf('=')+1);

const exit = () => {
    output.write(`Thank you for using File Manager, ${userName}!`);
    output.end();
    readLine.close();
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