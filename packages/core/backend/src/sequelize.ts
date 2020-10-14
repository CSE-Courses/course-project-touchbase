import path from "path";
import { Sequelize } from "sequelize-typescript";
import { Application } from "./declarations";

export default function configureSequelize(app: Application): void {
  const connectionString =
    process.env.NODE_ENV === "test"
      ? `sqlite://./data/testdb-${process.env.JEST_WORKER_ID}.sqlite`
      : app.get("sqlite");

  const sequelize = new Sequelize(connectionString, {
    dialect: "sqlite",
    logging: false,
    models: [path.join(__dirname, "models")],
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf(".model")) === member.toLowerCase();
    },
  });

  app.set("sequelizeClient", sequelize);
  app.set("sequelizeSync", sequelize.sync());
}
