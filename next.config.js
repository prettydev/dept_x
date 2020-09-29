require("dotenv").config();

const path = require("path");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["reusecore", "common"]);
const withImages = require("next-optimized-images");
const withFonts = require("next-fonts");

const envConfig = {
  GRAPHQL_URL: process.env.GRAPHQL_URL,
};

const settings = {
  env: envConfig,
  devIndicators: {
    autoPrerender: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withPlugins([[withTM], [withImages], withFonts], settings);
