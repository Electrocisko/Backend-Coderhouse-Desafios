import { Router } from "express";
import mongoose from "mongoose";
import MongoUsers from "../dao/mongoDao/MongoUsers.js";
import passport from "passport";

const router = Router();

const userService = new MongoUsers();
const connection = mongoose.connect('mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority')

router.post('/login', passport.authenticate('login',{failureRedirect:'/api/loginfail'}) ,async(req,res)=>{
try {
 
   req.session.user = {
       email : req.user.email,
       name: req.user.name,
       id: req.user._id
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
});

router.get('/loginfail',(req,res)=>{
    res.send({status:"error",error:"Error in login -"})
});

router.post('/register', passport.authenticate('register',{failureRedirect:'/api/registerfail'}), async (req,res) => {
    try {
        res.send({message: 'succes', payload: req.user._id})
    } catch (error) {
        console.log('Error in router register',error)
    }
})

router.get('/registerfail',(req,res)=>{
    res.send({status:"error",error:"Error in registering"})
})
export default router;
