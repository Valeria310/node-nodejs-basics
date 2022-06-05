import path from 'path'
import { release, version } from 'os'
import {createServer} from 'http'
import './files/c.js'
import commonjsVariables from 'commonjs-variables-for-esmodules'

const {
    __filename,
    __dirname
} = commonjsVariables(import.meta)

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = await import('./files/a.json', {assert:{type:'json'}});
} else {
    unknownObject = await import('./files/b.json', {assert:{type:'json'}});
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServer((_, res) => {
    res.end('Request accepted');
});

export {
    unknownObject,
    createMyServer,
};

