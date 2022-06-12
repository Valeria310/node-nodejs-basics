import fs from 'fs';
import path from 'path';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const mv = (data) => {
    const pathToFile = path.join(path.resolve(data.slice(0, data.indexOf(' '))));
    const fileName = path.parse(pathToFile).name;
    const ext = path.parse(pathToFile).ext;
    const pathToNewDir = path.join(path.resolve(data.slice(data.indexOf(' ')+1)));
    console.log(path.join(pathToNewDir, fileName+ext))
    fs.rename(pathToFile, path.join(pathToNewDir, fileName+ext), err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
}