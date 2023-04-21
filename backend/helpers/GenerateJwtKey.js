const crypto = require("crypto");

const generateJwtKey = () => {
  const key = crypto.randomBytes(32).toString("hex");
  console.log(key);
};

 generateJwtKey();
