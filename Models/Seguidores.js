const mongoose = require('mongoose');

const SeguidoresSchema = mongoose.Schema(
    {
        follower:{
            type : mongoose.Types.ObjectId,
            ref: 'Usuario',
        },
        following:[{
                type : mongoose.Types.ObjectId,
                ref:'Usuario'
            }],
    }
)

module.exports = mongoose.model("Seguidores", SeguidoresSchema)