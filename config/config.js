
const config = require('./config.json');
let configEnv = config["CREDS"];
Object.keys(configEnv).forEach((key) => {
  process.env[key] = configEnv[key];
});

