var express = require('express');
var router = express.Router();
const { body, check, validationResult } = require("express-validator/check");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Rodrigo Bustamante Jélvez' });
});

router.post('/', [
  check('name').isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres'),
  check('subject').isLength({ min: 3 }).withMessage('El asunto debe tener como mínimo 3 caracteres'),
  check('email').isEmail().withMessage('Correo electrónico invalido'),
  check('message').isLength({ min: 5 }).withMessage('El mensaje debe tener como mínimo 5 caracteres')
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.mapped() });
  } else {
    res.status(200).json({ message: 'Mensaje enviado correctamente' })
  }
})

module.exports = router;
