import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import crypto from 'crypto';
import zlib from 'zlib';
import {stdin as input, stdout as output, chdir} from 'process';
import { pipeline } from 'stream';

const errorText = 'Operation failed\n';
const readLine = readline.createInterface({input, output});
const userName = process.argv[2].slice(process.argv[2].indexOf('=')+1);

const exit = () => {
    output.write(`Thank you for using File Manager, ${userName}!`);
    output.end();
    readLine.close();
}

const showCurrentDir = () => {
    const currentDir = path.resolve();
    output.write(`You are currently in ${currentDir}\n`);
}

const promtToPrint = () => {
    output.write("Print your command...\n");
}

const showInfo = () => {
    showCurrentDir();
    promtToPrint();
}

const up = () => {
    const currentPath = path.resolve();
    const root = path.parse(currentPath).root;
    if(currentPath===root) return;
    const upDir = path.parse(currentPath).dir;
    chdir(upDir);
}

const cd = (desiredPath) => {
    try {
        chdir(desiredPath)
        showInfo();
    } catch (error) {
        output.write(errorText);
    }
}

const ls = async () => {
    const currentPath = path.resolve();
    try {
        const files = await fs.promises.readdir(currentPath);
        files.forEach(file => {
            output.write(file+'\n');
        })
        showInfo();
    } catch (error) {
        output.write(error)
    }
}

const cat = (pathToFile) => {
    try { 
        const read = fs.createReadStream(pathToFile);
        let data = '';
        read.on('data', chunk => data+=chunk);
        read.on('end', ()=> {
            output.write(data+'\n');
            showInfo();
        })
    } catch (error) {
        output.write(errorText)
    }
}

const add = (fileName) => {
    const pathToFile = path.join(path.resolve(), fileName);
    fs.access(pathToFile, err => {
        if(!err) output.write(errorText);
    })
    const write = fs.createWriteStream(pathToFile, err => {
        if(err) output.write(errorText);
    })
    write.on('ready', () => {
        showInfo();
    })
}

const rn = (data) => {
    const oldPathToFile = path.resolve(data.slice(0, data.indexOf(' ')));
    const newFileName = data.slice(data.indexOf(' ')+1);
    const newPathToFile = path.join(path.parse(oldPathToFile).dir, newFileName);
    fs.rename(oldPathToFile, newPathToFile, err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
} 

const cpFile = (data) => {
    const pathToFile = path.join(path.resolve(data.slice(0, data.indexOf(' '))));
    const fileName = path.parse(pathToFile).name;
    const pathToNewDir = path.join(path.resolve(data.slice(data.indexOf(' ')+1)));
    fs.access(path.join(pathToNewDir, fileName), err => {
        if(!err) {
            output.write('file is already exist '+errorText)
        }
    })
    fs.copyFile(pathToFile, path.join(pathToNewDir, fileName), err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
}

const mv = (data) => {
    const pathToFile = path.join(path.resolve(data.slice(0, data.indexOf(' '))));
    const fileName = path.parse(pathToFile).name;
    const ext = path.parse(pathToFile).ext;
    const pathToNewDir = path.join(path.resolve(data.slice(data.indexOf(' ')+1)));
    console.log(path.join(pathToNewDir, fileName+ext))
    fs.rename(pathToFile, path.join(pathToNewDir, fileName+ext), err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
} 

const rmFile = (pathToFile) => {
    fs.unlink(pathToFile, err => {
        if(err) {
            output.write(errorText);
        }
        showInfo();
    })
}

const hash = (pathToFile) => {
    fs.readFile(pathToFile, (err, data) => {
        if(err) {
            output.write(errorText);
        }
        const hash = crypto.createHash("sha256").update(data).digest("hex");
        output.write(hash+'\n');
        showInfo();
    })
}

const compress = async (data) => {
    const pathToFile = data.slice(0, data.indexOf(' ')); 
    const pathToDestination = data.slice(data.indexOf(' ')+1); 
    fs.access(pathToDestination,  (err) => {
        if(!err) {
            output.write(errorText);
            showInfo();
        } else {
            const read = fs.createReadStream(pathToFile);
            const write = fs.createWriteStream(pathToDestination);
            const brotliCompress = zlib.createBrotliCompress();
            fs.access(pathToFile, (err) => {
                if(err) {
                    output.write(errorText);
                    showInfo();
                }
                else{
                    pipeline(read, brotliCompress, write, err => {
                        if(err) output.write(errorText);
                        rmFile(pathToFile);
                    });
                }
            })
        }
    })
}

const decompress = (data) => {
    const pathToFile = data.slice(0, data.indexOf(' ')); 
    const pathToDestination = data.slice(data.indexOf(' ')+1); 
    fs.access(pathToDestination,  (err) => {
        if(!err) {
            output.write(errorText);
            showInfo();
        } else {
            const read = fs.createReadStream(pathToFile);
            const write = fs.createWriteStream(pathToDestination);
            const brotliDecompress = zlib.createBrotliDecompress();
            fs.access(pathToFile, (err) => {
                if(err) {
                    output.write(errorText);
                    showInfo();
                }
                else{
                    pipeline(read, brotliDecompress, write, err => {
                        if(err) output.write(errorText);
                        rmFile(pathToFile);
                    });
                }
            })
        }
    })
}

const osFunc = (method) => {
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

readLine.on('line', async input => {
    if(input==='.exit') {
        exit();
    } else if(input==='up') {
        up();
        showInfo();
    } else if(input.slice(0,2)==='cd') {
        cd(input.slice(3));
    } else if(input==='ls') {
        ls();
    } else if(input.slice(0,3)==='cat') {
        cat(input.slice(4));
    } else if(input.slice(0,3)==='add') {
        add(input.slice(4));
    } else if(input.slice(0,2)==='rn') {
        rn(input.slice(3));
    } else if(input.slice(0,2)==='cp') {
        cpFile(input.slice(3));
    } else if(input.slice(0,2)==='mv') {
        mv(input.slice(3));
    } else if(input.slice(0,2)==='rm') {
        rmFile(input.slice(3));
    } else if(input.slice(0,4)==='hash') {
        hash(input.slice(5));
    } else if(input.slice(0, 8)==='compress') {
        compress(input.slice(9));
    }else if(input.slice(0, 10)==='decompress') {
        decompress(input.slice(11));
    }else if(input.slice(0,2)==='os') {
        osFunc(input.slice(5));
    } else {
        output.write('Invalid input\n');
        showInfo();
    }
})

readLine.on('SIGINT', () => {
    exit()
})

output.write(`Welcome to the File Manager, ${userName}!\n`);
chdir(os.homedir());
showInfo();
