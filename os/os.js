import os from 'os';
import {stdout as output} from 'process';
import {showInfo} from'../shared.js';
import { errorText } from '../script.js';

export const osFunc = (method) => {
    switch (method) {
        case 'EOL':
            output.write(JSON.stringify(os.EOL)+'\n');
            break;
        case 'cpus':
            const cpus = os.cpus();
            output.write('amount of CPUS: '+cpus.length+'\n');
            cpus.forEach(cpu => {
                output.write(cpu.model + cpu.speed +'\n');
            })
            break;
        case 'homedir':
            output.write(os.homedir()+'\n');
            break;
        case 'username':
            output.write(os.userInfo().username+'\n');
            break;
        case 'architecture':
            output.write(os.arch()+'\n');
            break;
        default:
            output.write(errorText);
            break;
    }
    showInfo();
} 