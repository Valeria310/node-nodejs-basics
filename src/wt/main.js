import { resolve } from 'dns/promises';
import {cpus} from 'os'
import {Worker} from 'worker_threads'

export const performCalculations = async () => {
    const datas=[];
    for (let i=0; i<cpus().length; i++) {
        datas.push(i+10)
    }
    const result = (data)=>{
        return new Promise((res,rej)=>{
            const worker = new Worker('./worker.js', {
                workerData: data
            })
            worker.on('message', msg=>{
                res(msg)
            })
        })
    }
    const results = await Promise.all(datas.map(data => result(data)));
    console.log(results)
};
performCalculations()