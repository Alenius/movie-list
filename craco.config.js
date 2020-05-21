const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            "@primary-color": "#b67929",
            "@body-background": "#00243f",
            "@text-color": "#eee",
            "@heading-color": "#eee",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};
