const bcryptjs = require('bcryptjs');

const Usuario = require('../Models/Usuario');
const jwtGenerator = require('../helpers/jwtGenerator');

module.exports = {
    login : async (req,res) => {
        
        try {
            
            const {email, password} = req.body;
            
            /* verfico si el usuario existe */
            const usuario = await Usuario.findOne({email},{_id: 1, nombre: 1, email:1, password:1});
            if(!usuario){
                return res.status(400).json({
                    ok : false,
                    msg: 'Credenciales inválidas | email'
                })
            }

            /* verifico si la contraseña es correcta */
            const checkPassword = bcryptjs.compareSync(password, usuario.password);
            if(!checkPassword){
                return res.status(400).json({
                    ok : false,
                    msg: 'Credenciales inválidas | password'
                })
            }

            /* genero el token */
            const token = await jwtGenerator(usuario.id);
            return res.json({
                ok : true,
                token,
                usuario
            })

        } catch (error) {
            
            console.log(error);

            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuníquese con el desarrollador de backend'
            })
        }

    }
}
