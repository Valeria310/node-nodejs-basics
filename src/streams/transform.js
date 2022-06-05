import {Transform} from 'stream'

export const transform = async () => {
    const revert = new Transform({
        transform(chunk, encoding, callback) {
            callback()
        }
    })
    process.stdin.on('data', function(data) {
        revert._transform(data, 'utf-8', ()=>{
            data = data.reverse()
        });
        process.stdout.write(data)
    })
};
transform()