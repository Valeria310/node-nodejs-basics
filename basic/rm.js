import fs from 'fs';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const rmFile = (pathToFile) => {
    fs.unlink(pathToFile, err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
}