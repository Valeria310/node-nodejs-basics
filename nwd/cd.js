import {stdin as input, stdout as output, chdir} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const cd = (desiredPath) => {
    try {
        chdir(desiredPath)
        showInfo();
    } catch (error) {
        output.write(errorText);
        showInfo();
    }
}