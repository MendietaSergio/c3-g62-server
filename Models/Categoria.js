const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema(
    {
        name: {
            type: String,
            require: [true, 'El nombre es requerido']
        },
    }
)

module.exports = model('Categoria', CategoriaSchema)