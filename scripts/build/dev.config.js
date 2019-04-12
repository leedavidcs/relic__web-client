process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const ConfigFactory = require("./webpack.config");

// Generate configuration
module.exports = () => ConfigFactory("development");
