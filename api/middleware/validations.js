import { check, param, validationResult } from "express-validator";
//Middleware para verificar os resultados da validação

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: "Erro de validação",
      errors: errors.array(),
    });
  }
  next();
};
export const validateMunicipio = [
  check("codigo_municipio")
    .notEmpty()
    .withMessage("Código IBGE é obrigatório")
    .isInt({ min: 1000000, max: 9999999 })
    .withMessage("O código deve ser um número inteiro de 7 dígitos"),
  check("nome")
    .not().isEmpty().trim().withMessage("Nome é obrigatório")
    .isAlpha('pt-BR',{ignore:' '}).withMessage('Nome deve ser Alfa Numérico')
    .isLength({ max: 100 })
    .withMessage("Nome não pode ter mais que 100 caracteres"),
  check("capital")
    .isBoolean()
    .withMessage("Esse campo deve ser do tipo Boolean"),
  check("local.type")
    .notEmpty()
    .withMessage("O tipo do local deve ser obrigatório")
    .equals("Point")
    .withMessage('O tipo do local "Point"'),

  check("local.coordinates")
    .notEmpty()
    .withMessage("As coordenadas são obrigatórias")
    .isArray({ min: 2, max: 2 })
    .withMessage(
      "As coordenadas devem ser um array com a latitude e a longitude"
    ),
  check("local.coordinates.0")
    .isFloat({ min: -180, max: 180 })
    .withMessage("A longitude deve estar emtre -180 e 180"),
  validateRequest
];

export const validateUsuario = [
  check('nome')
    .not().isEmpty().trim().withMessage("Nome é obrigatório")
    .isAlpha('pt-BR',{ignore:' '}).withMessage('Nome deve ser Alfa Numérico')
    .isLength({min:3}).withMessage('Informe no mínimo 3 caracteres')
    .isLength({max:100}).withMessage('Informe no máximo 100 caracteres'),

  check('email')
    .not().isEmpty().trim().withMessage('É obrigatório informar o nome')
    .isEmail().withMessage('Não é um email')
    .isLowercase().withMessage('Não são permetidas maiúsculas')
    /*.custom((value) =>{
      return db.colection('usuarios')
      .find({email:{$eq:value}}).toArray()
      .then((email) => {
        if(email.lenght){
          return Promise.reject(`Email ${email} já existente`)
        }
      }) 
    })*/
    ,

  check('senha')
    .not().isEmpty().trim().withMessage('A senha é obrigatória')
    .isLength({min:6}).withMessage('Informe no mínimo 6 caracteres')
    .isStrongPassword({
      minNumbers:2,
      minSymbols:1,
      minLength:5
    }).withMessage('Senha fraca'),

  check('ativo')
    .default(true)
    .isBoolean().withMessage('O valor deve ser um booleano'),
  
  check('tipo')
  .default('Cliente')
  .isIn(['Admin','Cliente']).withMessage('O tipo deve ser Admin ou Cliente'),
  
  check('avatar')
    .optional({nullable:true})
    .isURL().withMessage('A URL do Avatar é inválida'),
  
  //aplica as validações

  validateRequest
]
