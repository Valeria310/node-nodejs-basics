import fs from 'fs';
import path from 'path';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const cpFile = (data) => {
    const pathToFile = path.join(path.resolve(data.slice(0, data.indexOf(' '))));
    const fileName = path.parse(pathToFile).name;
    const pathToNewDir = path.join(path.resolve(data.slice(data.indexOf(' ')+1)));
    fs.access(path.join(pathToNewDir, fileName), err => {
        if(!err) {
            output.write('file is already exist '+errorText)
        }
    })
    fs.copyFile(pathToFile, path.join(pathToNewDir, fileName), err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
}