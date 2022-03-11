const mongoose = require('mongoose');

const RolSchema = mongoose.Schema(
    {
        rol:{
            type:String,
            require: true,
            default: "user"
        }
    }
)
module.exports = new mongoose.model("Rols",RolSchema);