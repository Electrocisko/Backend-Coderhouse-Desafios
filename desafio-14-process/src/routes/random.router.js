import { Router } from "express";
import { fork } from "child_process";
import __dirname from "../utils.js";

const router = new Router();
let aux;

router.get("/random", (req, res) => {
  let q = req.query.cant;
  if (q === undefined) {q='Sin datos'}
  const child = fork(__dirname+"/others/random.js");
  child.send(q);
  child.on("message", (val) => {
    aux = Object.entries(val); // Para mostrarlos en un array
    res.send(aux)
  });
});

export default router;
