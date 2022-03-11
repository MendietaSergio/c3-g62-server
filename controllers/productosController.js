const Producto = require('../Models/Producto')
const Categoria = require('../Models/Categoria');
const Comentario = require('../Models/Comentario');
const { consultant, seller } = require('../helpers/structureMail');
const nodeMailer = require('nodemailer');


var smtpConfig = {
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'pruebanodemailers@gmail.com',
        pass: 'Nodemailers1908'
        // pass: 'aduwbhzuypeuefam'
    },
    tls: {
        rejectUnauthorized: false,
        secureProtocol: "TLSv1_method"
    }
};

let transporter = nodeMailer.createTransport(smtpConfig);
const sendMailAPI = (content, mail = false) => {
    let transmitter = mail ? content.emailConsultant : content.emailSeller;
    let titleSubject = mail ? "Consulta enviada!" : "Tienes una propuesta!"
    let mailOptions = {
        from: "Marketplace - Arte Digital",
        to: transmitter,
        subject: titleSubject,
        html: mail ? consultant(content) : seller(content)
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Correo no enviado apicontroller ", error);
        } else {
            console.log("Correo enviado " + info.response);
        }
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    });
}
module.exports = {

    getAll: async (req, res) => {
        try {
            const product = await Producto.aggregate(
                [
                    {
                        $lookup:
                        {
                            from: "usuarios",
                            localField: "autor_producto",
                            foreignField: "_id",
                            as: "usuarioAutor"
                        }
                    },
                    { $unwind: "$usuarioAutor" }
                ]
            )
            return res.json(product)
        } catch (error) {
            res.status(400).json({
                message: "Error al procesar la peticion",
            });
        }
    },
    getPagination: async (req, res) => {
        const { limit = 10, from = 0 } = req.query;
        try {
            const product = await Producto.aggregate(
                [
                    {
                        $lookup:
                        {
                            from: "usuarios",
                            localField: "autor_producto",
                            foreignField: "_id",
                            as: "usuarioAutor"
                        }
                    },
                    { $unwind: "$usuarioAutor" }
                ]
            ).skip(+from).limit(+limit)
            return res.json(product)
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Error al procesar la peticion",
            });
        }
    },
    newProduct: async (req, res) => {
        try {
            const { nombre, nombre_autor, img_art, descripcion, precio, autor_producto, categoria } = req.body;
            const product = new Producto({
                nombre,
                descripcion,
                precio,
                autor_producto,
                categoria,
                nombre_autor,
                img_art
            })
            await product.save()
            return res.json({
                ok: true,
                msg: 'Producto agregado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuniquese con el desarrollador'
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            let update = req.body;
            await Producto.findOneAndUpdate(
                { _id: req.params.id },
                update,
                { new: true }
            )
            res.json({
                ok: true,
                msg: "Producto actualizado"
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "Error al querer actualizar"
            })
        }
    },
    productUserID: async (req, res) => {
        console.log(req.params.id);
        try {
            const productUser = await Producto.find({ autor_producto: req.params.id })
            return res.json({
                ok: true,
                productUser
            })
        } catch (error) {
            res.status(400).json({
                ok: true,
                msg: "Error al querer mostrar"
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Producto.findByIdAndDelete({ _id: req.params.id })
            return res.json({
                ok: true,
                msg: "Producto eliminado"
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "Error al querer eliminar"
            })
        }
    },
    detailProduct: async (req, res) => {
        try {
            const product = await Producto.findById(req.params.id);
            product.vistas = product.vistas + 1
            if (!product) {
                res.status(400).json({
                    ok: false,
                    msg: "El producto no exite."
                })
            }
            const productUpdate = await Producto.findByIdAndUpdate(
                { _id: product._id },
                product, { new: true }
            )
            const comments = await Comentario.find({ id_producto: product._id })
            return res.json({ productUpdate, comments })
        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "Error al procesar la petición!"
            })
        }
    },
    search: async (req, res) => {
        const { query } = req.query
        try {
            const product = await Producto.find({
                $or: [
                    {
                        nombre: { $regex: query, $options: 'i' },
                    },
                    {
                        descripcion: { $regex: query, $options: 'i' },
                    },
                    {
                        nombre_autor: { $regex: query, $options: 'i' },
                    }
                ]
                // Para consultar al grupo.
                // para agregar la busqueta por categoria, habría que cambiar que al guardar el nuevo producto/publicacion, se guarde el nombre de la categoría
                // y no el id de la categoría.
            });
            if (product.length > 0) {
                return res.json({
                    ok: true,
                    product,
                })
            } else {
                res.json({
                    ok: false,
                    msg: "No se encontraron resultados"
                })
            }
        } catch (error) {
            res.status(400).json({
                msg: "Error al procesar la petición."
            })
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categories = await Categoria.find({})
            res.json(categories)
        } catch (error) {
            res.status(400).json({
                msg: "Error al procesar la petición."
            })
        }
    },
    newCategorie: async (req, res) => {
        try {
            const { name } = req.body
            console.log("name ", name);
            const categorie = new Categoria({
                name
            })
            await categorie.save()
            return res.json({
                ok: true,
                msg: 'Producto agregado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                ok: false,
                msg: error.message ? error.message : 'Comuniquese con el desarrollador'
            })
        }
    },
    newComment: async (req, res) => {
        // Busco el producto, si esta creo el comentario.
        const product = await Producto.findOne({ _id: req.params.idProduct })
        if (product) {
            const newComment = new Comentario(req.body)
            await newComment.save()
            return res.json({
                ok: true
            })
        }
        return res.json({
            ok: false
        })
    },
    formConsult: (req, res) => {
        let mail = true;

        try {
            sendMailAPI(req.body, mail)
            sendMailAPI(req.body)

            return res.json({
                ok: true,
                mgs:"Consulta enviada!"
            })

        } catch (error) {
            return res.json({
                ok:false,
                msg:"Consulta no enviada."
            })
        }
    }
}