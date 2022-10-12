import { Router } from "express";
//import { fork } from "child_process";
import __dirname from "../utils.js";

const router = new Router();
let aux;

const randomize = (q) => {
  let cantidad = parseInt(q);
    let result;
    let numeros=[];
    const resultado = {};

    if (isNaN(cantidad)){
        cantidad = 100000000;
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    
    for (let i=1; i<=cantidad;i++){
        result = getRandomInt(1000);
        numeros.push(result);
    }
    numeros.forEach(el => (resultado[el] = resultado[el] + 1 || 1))
    return resultado;
}

router.get("/random", (req, res) => {
  let q = req.query.cant;
  if (q === undefined) {q=100000000}
  aux = randomize(q);
    res.send(aux)
  });


export default router;
