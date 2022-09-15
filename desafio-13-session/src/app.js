import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import loginRouter from './routes/login.router.js';
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";


//const connection = mongoose.connect('mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority')

const app = express();
const PORT = 8080;
let usaContenedor = new Contenedor();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'maxVerstappen',
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority',
    ttl: 300
  }),
  resave: false,
  saveUninitialized: false,
}))
app.use('/', express.static(__dirname + '/public'));
app.use('/',viewsRouter);
app.use('/api',loginRouter);
app.use("/api", productsRouter);
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
