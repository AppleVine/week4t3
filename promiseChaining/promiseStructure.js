function waitThenSquare(input) {
    return new Promise((resolve, reject) => {
        if (typeof input === 'number') {
            resolve(input * input)
        } else {
            reject(new Error("Input must be a number"))
        }
        
    })
}