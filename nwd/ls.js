import fs from 'fs';
import path from 'path';
import { stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const ls = async () => {
    const currentPath = path.resolve();
    try {
        const files = await fs.promises.readdir(currentPath);
        files.forEach(file => {
            output.write(file+'\n');
        })
        showInfo();
    } catch (error) {
        output.write(errorText);
        showInfo();
    }
}