const dotenv = require("dotenv");
const envConfig = dotenv.config({ path: ".env.production" }).parsed || {};
module.exports = {
  apps: [
    {
      name: "toes.ch Blog",
      port: "8702",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "production",
        ...envConfig,
      },
    },
  ],
};
