import express from "express";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import loginRouter from './routes/login.router.js';
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import dotenvConfig from "./config/dotenv.config.js";
import randomRouter from './routes/random.router.js';

// Argumentos pasados por linea
import yargs from 'yargs';
const yargsInstance = yargs(process.argv.slice(2)).default({
  p:0
}).alias({
  p:'PORT'
})
const args = yargsInstance.argv;


const app = express();
const PORT = dotenvConfig.app.PORT;
//const PORT = args.PORT || 3000;
const MONGO_URL = dotenvConfig.mongo.MONGO_URL;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'maxVerstappen',
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    ttl: 300
  }),
  resave: false,
  saveUninitialized: false,
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', express.static(__dirname + '/public'));
app.use('/',viewsRouter);
app.use('/api',loginRouter);
app.use("/api", productsRouter);
app.use('/api', randomRouter);

// Template config engine
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');


const server = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en http://localhost:${server.address().port}`
  );
});

server.on("Error", (error) => {
  console.log("Error en el servidor", error);
});
