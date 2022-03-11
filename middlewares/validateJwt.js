const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');

const validateJwt = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, "Est0sMyPub1uckZeqret");
        const usuarioAutenticado = await Usuario.findById(uid);
        console.log("usuarioAutenticado validateJWT.js ", usuarioAutenticado);
        /* verifico si el usaurio existe */
        if (!usuarioAutenticado) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido | usuario no existe'
            })
        }
        return res.json(usuarioAutenticado)

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}

module.exports = validateJwt;