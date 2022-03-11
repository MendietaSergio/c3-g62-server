const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema(
    {
        nombre : {
            type : String,
            require : [true, 'El nombre es obligatorio']
        },
        email : {
            type : String,
            require : [true, 'El correo el obligatorio'],
            unique : true
        },
        rol : {
            type : String,
            require : [true, 'El rol es obligatorio'],
            default : 'usuario'
        },
        password : {
            type: String,
            require: true
        },
        // seguidores: [{
        //     type : Schema.Types.ObjectId,
        //     ref:'Usuario'
        // }],
        cant_vendido: {
            type : Number
        },
        telefono :{
            type : Number,
        },

    },
    {
        timestamps: true
    }
)

// UsuarioSchema.methods.toJSON = function(){
//     const {__v, password, _id, ...user} = this.toObject(); //oculta datos sensibles
//     user.uid = _id; //creo una nueva propiedad solo para visualizar el id
//     return usuario
// }

module.exports = model('Usuario', UsuarioSchema)