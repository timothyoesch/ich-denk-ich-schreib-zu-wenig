module.exports = {
  apps: [
    {
      name: "toes.ch Blog",
      port: "8702",
      exec_mode: "cluster",
      instances: "2",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
