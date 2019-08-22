const fs = require('fs');
const co = require('co');

const readFile = function(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const gen = function*() {
    const f1 = yield readFile('./public/html/tmp.html');
    const f2 = yield readFile('./public/html/regsucc.html');
    console.log(f1.toString());
    console.log(f2.toString());
};

const asyncReadFile = async function () {
    await ( function() {
        setTimeout(() => {
            console.log("f1...")
        }, 2000)
    }());
    await( function() {
        setTimeout(() => {
            console.log("f2...")
        }, 1000)
    }());;
};


// co(gen)
asyncReadFile()