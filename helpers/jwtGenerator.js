const jwt = require('jsonwebtoken');

module.exports =  (uid = '') => {

    return new Promise( (resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload,"Est0sMyPub1uckZeqret",{
            expiresIn : '4h'
        }, (error, token) => {

            if(error){
                console.log(error)
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })

    })

}