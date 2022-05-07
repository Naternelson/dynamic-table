export default function wait(timeout:number = 0){
    return new Promise((res) => {
        setTimeout(() => {
            res(undefined)
        }, timeout)
    })
}