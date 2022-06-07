import crypto from 'crypto'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const calculateHash = async () => {
    const hash = crypto.createHash("sha256", path.parse(__dirname, 'files', 'fileToCalculateHashFor.txt'))
    console.log(hash.digest('hex'))
};
calculateHash()