const { run } = require('@probot/adapter-github-actions')
const app = require("./index");

run(app).catch((error) => {
  console.error(error);
  process.exit(1);
});