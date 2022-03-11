const mongoose = require("mongoose");

const CarritoSchema = mongoose.Schema(
  {
    productoID: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    usuarioID: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    precio_total: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carrito", CarritoSchema);
