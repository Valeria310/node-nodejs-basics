export const parseArgs = () => {
    const args = process.argv.slice(2);
    for (let i=0; i<args.length; i++) {
        if(args[i].slice(0,2)=='--' && args[i+1]) {
            console.log(args[i], 'is', args[i+1])
        }
    }
};
parseArgs()