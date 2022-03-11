const mongoose = require('mongoose');

const FavoritosSchema = mongoose.Schema(
    {
        usuarioID:{
            types: mongoose.Types.ObjectId,
            require: true
        },
        productoID:{
            types: mongoose.Types.ObjectId,
            require: true
        }
    }
)

module.exports = mongoose.model("Favoritos", FavoritosSchema)