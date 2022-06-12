import fs from 'fs';
import crypto from 'crypto';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const hash = (pathToFile) => {
    fs.readFile(pathToFile, (err, data) => {
        if(err) {
            output.write(errorText);
        }
        const hash = crypto.createHash("sha256").update(data).digest("hex");
        output.write(hash+'\n');
        showInfo();
    })
}