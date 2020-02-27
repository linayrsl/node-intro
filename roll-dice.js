function rollDice() {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 6) + 1 );
        }, 2000);
    })
}

module.exports = rollDice;