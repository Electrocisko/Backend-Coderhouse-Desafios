module.exports = {
  apps: [
    {
      name: "server1",
      script: "src/app.js",
      env:{
        PORT:8080
      },
      watch:true,
    },
    {
      name: "server2",
      script: "src/app2.js",
      env:{
        PORT:8081
      },
      exec_mode:'cluster',
      instances:"max",
      watch:true
    },
  ],
};
