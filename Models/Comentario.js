const {Schema, model} = require('mongoose')

const ComentarioSchema = Schema(
    {
        contenido: {
            type: String,
            required : [true, 'Debes incluir contenido'],
        },
        autor_comentario: {
            type: Schema.Types.ObjectId,
            required : [true, 'Debes indicar el autor'],
        },
        nombre_autor:{ 
            type: String,
            required:[true, "Debes indicar el nombre del autor"]
        },
        id_producto: {
            type : Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Comentario', ComentarioSchema)