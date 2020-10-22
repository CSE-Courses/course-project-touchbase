// TODO: Replace once https://github.com/facebook/jest/pull/8751 is merged (should be Jest 27)
// import app from '@/app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require("@/app").default;

beforeEach(async () => {
  // Reset the contents of our DB before each test gets run
  const sequelize = app.get("sequelizeClient");
  await app.get("sequelizeSync");
  await sequelize.drop({ force: true, cascade: true });
  await sequelize.sync();
});
