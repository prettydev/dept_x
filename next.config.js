const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["reusecore", "common"]);
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");

module.exports = withPlugins([
  [withTM],
  [
    withOptimizedImages,
    {
      mozjpeg: {
        quality: 90,
      },
      webp: {
        preset: "default",
        quality: 90,
      },
    },
  ],
  withFonts,
]);
