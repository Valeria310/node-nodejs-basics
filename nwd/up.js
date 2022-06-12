import path from 'path';
import {chdir} from 'process';

export const up = () => {
    const currentPath = path.resolve();
    const root = path.parse(currentPath).root;
    if(currentPath===root) return;
    const upDir = path.parse(currentPath).dir;
    chdir(upDir);
}