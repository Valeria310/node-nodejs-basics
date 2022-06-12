import fs from 'fs';
import path from 'path';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const rn = (data) => {
    const oldPathToFile = path.resolve(data.slice(0, data.indexOf(' ')));
    const newFileName = data.slice(data.indexOf(' ')+1);
    const newPathToFile = path.join(path.parse(oldPathToFile).dir, newFileName);
    fs.rename(oldPathToFile, newPathToFile, err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
}