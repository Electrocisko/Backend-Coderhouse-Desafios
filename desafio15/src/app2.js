import express from 'express';
import dotenvConfig from "./config/dotenv.config.js";
import randomRouter from './routes/random.router.js'

const PORT = dotenvConfig.app.PORT;
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use('/api', randomRouter);

const server = app.listen(PORT, () => {
    console.log(
      `Servidor escuchando en http://localhost:${server.address().port}`
    );
  });
  
  server.on("Error", (error) => {
    console.log("Error en el servidor", error);
  });

app.get('/',(req,res) => {
    res.send(`Servidor escuchando en http://localhost:${server.address().port} y proceso pid: ${process.pid}`)
})