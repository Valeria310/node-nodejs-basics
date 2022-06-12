import fs from 'fs';
import path from 'path';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const add = (fileName) => {
    const pathToFile = path.join(path.resolve(), fileName);
    fs.access(pathToFile, err => {
        if(!err) output.write(errorText);
    })
    const write = fs.createWriteStream(pathToFile, err => {
        if(err) output.write(errorText);
    })
    write.on('ready', () => {
        showInfo();
    })
}