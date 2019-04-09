process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const ConfigFactory = require("../config/webpack.config");

// Generate configuration
module.exports = () => ConfigFactory("development");
