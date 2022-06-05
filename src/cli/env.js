export const parseEnv = () => {
    const envs = process.env;
    for (let key in envs) {
        if(key.slice(0,4)==='RSS_') {
            console.log(key+'='+envs[key])
        }
    }
};
parseEnv()
