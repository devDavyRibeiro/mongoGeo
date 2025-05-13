import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { param } from "express-validator";
export const InsereUsuario = async(req, res) =>{
    req.body.avatar = `https://ui-avatar.com/api?name${req.body.nome.replace(/ /g , '+')}&background==F00&color=FFF`
    const salt = await bcrypt.genSalt(10)
    req.body.senha = await bcrypt.hash(req.body.senha,salt)
    
    const db = req.app.locals.db;
    await db.collection('usuarios')
    .insertOne(req.body)
    .then(result => res.status(201).send(result)
    .catch(error => res.status(400).json(error))
    );
}
export const efetuaLogin = async (req, res)=>{
    const {email, senha} = req.body;
    try {
        const db = req.app.locals.db;
        let usuario = await db.collection('usuarios').find({email:email}).limit(1).toArray();
        if(!usuario.lenght){
            return res.status(404).json({
                erros:[{
                    value:`${email}`,
                    msg:`O email ${email} não está cadastrado`,
                    param: 'email'
                }]
            })
        }
        const isMatch = await bcrypt.compare(senha, usuario[0].senha)
        if(!isMatch){
            return res.status(403).json({
                erros:[{
                    value:'senha',
                    msg: `A senha informada está incorreta}`,
                    param: 'senha'
                }]
            })
        }

        jwt.sign(
            {usuario:{id: usuario[0]._id}},
            process.env.SECRET_KEY,
            {expiresIn:process.env.EXPIRE_IN},
            (err, token) =>  {
                if(err) {throw err}

                res.status(200).json({
                    access_token:token,
                    msg:'Login efetuado com sucesso'
                })
            }
        )
        
    } catch (error) {
        console.log(error);
    }
}
