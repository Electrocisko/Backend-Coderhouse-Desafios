import { Router } from "express";
import mongoose from "mongoose";
import MongoUsers from "../dao/mongoDao/MongoUsers.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';

const router = Router();

const userService = new MongoUsers();
const connection = mongoose.connect('mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority')

router.post('/login',async(req,res)=>{
try {
    const {email} = req.body;
    if (!email) return res.status(400).send({status: 'error', error: 'Incomplete values'});
    let user = await userService.getByMail(email);
    if (!user) return res.status(400).send({status: 'error', error: 'User non exists'});
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
        if(!err) res.send('Logout OK')
        else res.send({status: 'Logout Error', body: err})
    })
})



export default router;
