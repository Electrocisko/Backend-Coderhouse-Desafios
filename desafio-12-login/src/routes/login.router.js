import { Router } from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo';

const router = Router();

router.post('/login',(req,res)=>{
    const {email} = req.body;
    if (email === 'ezequielguillermoz@gmail.com'){
       req.session = {
        email: email
       }
        return res.send({message: 'Logeado'})
    }
    else {
        res.send({message: 'Credencial no valido'})
    }
    
})

export default router;

// app.post('/login', (req,res) => {
//     const {email, password} = req.body;
//     if (email === 'correo' && password==='123'){
//         req.session.user={
//             email,
//             role:'user'
//         }
//         return res.send('Logeado')
//     }
//     else {
//         res.send('credenciales no validos')
//     }
// });