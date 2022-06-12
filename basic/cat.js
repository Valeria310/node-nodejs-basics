import fs from 'fs';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const cat = (pathToFile) => {
    fs.access(pathToFile, err => {
        if(err) {
            output.write(errorText);
            showInfo();
        } else {
            const read = fs.createReadStream(pathToFile);
            let data = '';
            read.on('data', chunk => data+=chunk);
            read.on('end', ()=> {
                output.write(data+'\n');
                showInfo();
            })
        }
    })
}
