const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {usuariosGet,usuarioDetail ,usuariosPost,usuariosPut,usuariosDelete, follow} = require('../controllers/usuariosController');
const {validateFiels, validateJwt, checkRol} = require('../middlewares');
const {emailVerify, isRolValid, userVerifyId} = require('../helpers/db-validators')

router
  .get('/', usuariosGet)
  .get('/:userID', usuarioDetail)
  
  .post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe ser más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email no es vádlido').isEmail(),
    check('email').custom(emailVerify),
    // check('rol', 'El rol es requerido').notEmpty(),
    // check('rol').custom(isRolValid),
    validateFiels
  ],usuariosPost)

  .put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(userVerifyId),
        check('rol').custom(isRolValid),
        validateFiels
    ], usuariosPut)

    .delete('/:id',[
      validateJwt,
      checkRol('ADMIN_ROL'),
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom(userVerifyId),
      validateFiels
  ], usuariosDelete)

  .put('/follow/:id', follow)

module.exports = router;
