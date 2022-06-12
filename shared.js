import path from 'path';
import {stdout as output} from 'process';

const showCurrentDir = () => {
    const currentDir = path.resolve();
    output.write(`You are currently in ${currentDir}\n`);
}

const promtToPrint = () => {
    output.write("Print your command...\n");
}

export const showInfo = () => {
    showCurrentDir();
    promtToPrint();
}