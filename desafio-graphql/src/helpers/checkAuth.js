
let admin = true;

function checkAdmin(req, res, next) {
    if (admin === true) {
      next();
    } else {
      res.status(401).send({
        message: "Does not have authorization",
      });
    }
  };

  export default checkAdmin;