const {Usuario, Rol} = require('../Models');

const emailVerify = async (email) => {

    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
        throw new Error(`El email ${email} ya está registro`)
    }

}

const isRolValid = async (rol) => {
    
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está contemplado`)
    }
}

const userVerifyId = async (id) => {

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El ${id} no existe en la base de datos`)
    }
}

module.exports = {
    emailVerify,
    isRolValid,
    userVerifyId
}