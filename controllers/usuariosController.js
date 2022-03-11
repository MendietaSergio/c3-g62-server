const bcrypjs = require('bcryptjs');
const Seguidores = require('../Models/Seguidores');
const Usuario = require('../Models/Usuario');

module.exports = {

    usuariosGet: async (req, res) => {

        const { limit = 5, from = 0 } = req.query;

        try {
            if (limit && from) {
                /* Promise.all corre las promesas en simultáneo */
                const [usuarios, total] = await Promise.all(
                    [
                        Usuario.find({}, { _id: 1, nombre: 1, email: 1 })
                            .skip(+from)
                            .limit(+limit),
                        Usuario.countDocuments()
                    ]
                )
                return res.json({
                    ok: true,
                    total,
                    data: usuarios
                })
            } else {
                const usuarios = await Usuario.find({}, { _id: 1, nombre: 1, email: 1 })
                console.log(usuarios);
                // console.log("length ",totalUser.length);
                return res.json({
                    ok: true,
                    total: usuarios.length,
                    data: usuarios
                })
            }

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuníquese con el desarrollador de backend'
            })
        }
    },
    usuarioDetail: async (req, res) => {

        try {
            const userDetail = await Usuario.findById(req.params.userID)
            if(!userDetail){
                return res.status(400).json({
                    ok: false,
                    msg: "El usuario no existe."
                })
            }
            return res.json({
                ok: true,
                userDetail
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "Error al procesar la petición!"
            })
        }
    },
    usuariosPost: async (req, res) => {

        try {
            const { nombre, email, rol, password } = req.body;

            const usuario = new Usuario({
                nombre,
                email,
                rol,
                password
            })

            usuario.password = bcrypjs.hashSync(password, 10);

            /* incluí esta configuración para utilizar la validacion del modelo */
            await usuario.save({ validateBeforeSave: false });

            const newFollowers = new Seguidores({ follower: usuario._id })
            await newFollowers.save()

            return res.json({
                ok: true,
                // data : usuario,
                msg: 'usuario agregado'
            })
        } catch (error) {

            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuníquese con el desarrollador de backend'
            })
        }
    },
    usuariosPut: async (req, res) => {

        try {
            const { id } = req.params;
            const { ...rest } = req.body;

            /* establezco la opción new en true para recuperar la información luego de ser actualizada */
            const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });

            return res.status(201).json({
                ok: true,
                data: usuario,
                msg: 'usuario actualizado'
            })
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuníquese con el desarrollador de backend'
            })
        }
    },
    usuariosDelete: async (req, res) => {

        try {

            const { id } = req.params;
            await Usuario.findByIdAndDelete(id);

            return res.json({
                ok: true,
                msg: 'usuario eliminado'
            })

        } catch (error) {

            console.log(error);

            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuníquese con el desarrollador de backend'
            })
        }
    },
    follow: async (req, res) => {
        // console.log("datos enviados ", req.body);
        // console.log(req.params.id)
        try {
            const { id } = req.params.id;
            const { ...rest } = req.body;
            console.log("valor req.body ", req.body);

            /* establezco la opción new en true para recuperar la información luego de ser actualizada */
            const seguidorNew = await Seguidores.findByIdAndUpdate(
                id, ...rest, { new: true }
            );
            console.log("data: ", seguidorNew);

            return res.status(201).json({
                ok: true,
                // data : usuario,
                msg: 'usuario actualizado'
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