let jwt = require("jsonwebtoken");

function signAsync(data,key = "123456789") {
    return new Promise((resolve, reject) => {
        jwt.sign(data,key,(error,data)=>{
            if (error) {
                return reject(error)
            }
            return resolve(data)
        })
    })
}

function verifyAsync(token,key = "123456789") {
    return new Promise((resolve, reject) => {
        jwt.verify(token,key,(error,data)=>{
            if (error) {
                return reject(error)
            }
            return resolve(data)
        })
    })
}
module.exports = {signAsync,verifyAsync};
