const {allowedOrigins} = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.Origin;
  

    res.header("Access-Control-Allow-Credentials", true);
  
  next();
};
module.exports = { credentials };
