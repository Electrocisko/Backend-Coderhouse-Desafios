import passport from "passport";
import local from "passport-local";
import MongoUsers from "../dao/mongoDao/MongoUsers.js";
import {createHash} from '../utils.js';

const userService = new MongoUsers();
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  try {
    passport.use(
      "register",
      new LocalStrategy(
        {
          passReqToCallback: true,
          usernameField: "email",
        },
        async (req, email, password, done) => {
          const { name } = req.body; //Traigo solo name, porque email y password viene por el callback
          if (!name || !email || !password)
            return done(null, false, {message: 'Incomplete values'});
          const exists = await userService.getByMail(email);
          if (exists)
            return done(null, false, {message: 'User already exist'});
          let user = {
            name: name,
            email: email,
            password: createHash(password),
          };
          let result = await userService.save(user);
          return done(null, result);
        }
      )
    );
    passport.serializeUser((user,done) => {
        done(null,user._id);
    })
    passport.deserializeUser(async (id,done) => {
        let result = await userService.getById(id);
        return done(null,result);
    })
  } catch (error) {
    console.log("Error", error);
  }
};

export default initializePassport;