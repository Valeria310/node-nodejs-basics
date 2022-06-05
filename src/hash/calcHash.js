import crypto from 'crypto'
import path from 'path';
import commonjsVariables from 'commonjs-variables-for-esmodules'

const {
    __dirname
} = commonjsVariables(import.meta)

export const calculateHash = async () => {
    const hash = crypto.createHash("sha256", path.parse(__dirname, 'files', 'fileToCalculateHashFor.txt'))
    console.log(hash.digest('hex'))
};
calculateHash()