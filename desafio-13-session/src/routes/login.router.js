import { Router } from "express";
import mongoose from "mongoose";
import MongoUsers from "../dao/mongoDao/MongoUsers.js";
import { createHash , isValidPassword } from '../utils.js';

const router = Router();

const userService = new MongoUsers();
const connection = mongoose.connect('mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority')

router.post('/login',async(req,res)=>{
try {
    const {email, password} = req.body;
    if (!email) return res.status(400).send({status: 'error', error: 'Incomplete values'});
    let user = await userService.getByMail(email);
    if (!user) return res.status(400).send({status: 'error', error: 'User non exists'});
    if (!isValidPassword(user,password)) return res.status(400).send({status:'error'});
   req.session.user = {
       email : user.email,
       name: user.name
   }
   res.send({status:'succes', payload: req.session.user})
} catch (error) {
    console.log('error en post',error)
}
})

router.get('/logout',async(req,res) => {
    req.session.destroy( err => {
        if(!err)  res.redirect('/login');
        else res.send({status: 'Logout Error', body: err})
    });
})


router.post('/register', async (req,res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).send('Incomplete values');
        const exists = await userService.getByMail(email);
        if (exists) return res.status(400).send({status: 'error', error:"Usuario ya registrado"});
        let user = {
            name: name,
            email: email,
            password: createHash(password)
        }
        let result = await userService.save(user)
        res.send({message: 'succes', payload: result})

    } catch (error) {
        console.log('error',error)
    }
})

export default router;
