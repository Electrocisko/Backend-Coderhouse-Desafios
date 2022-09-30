process.on('message',info => {
    let cantidad = parseInt(info);
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
    process.send(resultado);
})


    



  


