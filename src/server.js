const mongoose = require ("mongoose")
const app = require ("./app");
const config = require ("./config");

async function main() {
    mongoose.set('strictQuery', false)
  await mongoose.connect(config.database_url);
  console.log("Successfully Connected to server");
  app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}`);
  });
}
main();