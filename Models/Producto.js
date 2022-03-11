const {Schema, model} = require('mongoose')

const ProductoSchema = Schema(
    {
        nombre:{
            type: String,
            require: [true, 'El nombre es obligatorio']
        },
        nombre_autor:{
            type: String,
            require:[true, 'El nombre del autor es obligatorio']
        },
        img_art:{
            type:String,
            require:[true, 'La imagen es obligatorio']
        },
        descripcion: {
            type: String,
            require: [true, 'La descripción es obligatoria']
        },
        precio:{
            type: Number,
            require: [true, ' El precio es requerido']
        },
        oferta : {
            type: Boolean,
            default: false
        },
        autor_producto: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            require : [true, 'Debes indicar el artista']
        },
        disponible: {
            type : Boolean,
            default : true
        },
        vistas : {
            type: Number,
            default:0
        },
        seguidores:{
            type:Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        id_unico: {
            type: Number
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref : 'Categoria',
            require : [true, 'Debes indicar la categoría']
        }
    },
    {
        timestamps: true
    }
)
module.exports = model('Producto', ProductoSchema)