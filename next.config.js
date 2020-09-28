require("dotenv").config();

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["reusecore", "common"]);
const withImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const withPWA = require("next-pwa");

const envConfig = {
  GRAPHQL_URL: process.env.GRAPHQL_URL,
};

const settings = {
  env: envConfig,
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: "public",
  },
};

const plugins = [[withTM], [withImages], withFonts];

module.exports = withPlugins(plugins, settings);
