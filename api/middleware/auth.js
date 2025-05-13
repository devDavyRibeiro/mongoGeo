import jwt from 'jsonwebtoken';
export default async function auth(req, res, next) {
    const token = req.header('access-token');
    if(!token) return res.status(401).json({
        msg: 'Acesso Negado É obrigatório o envio de Tokien JWT'
    })
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.usuario = decoded.usuario
        next()
    } catch (error) {
        res.status(403).send({error:'Token Invalido'})
    }
}