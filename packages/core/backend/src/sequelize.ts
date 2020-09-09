import path from "path";
import { Sequelize } from "sequelize-typescript";
import { Application } from "./declarations";

export default function configureSequelize(app: Application): void {
  const connectionString = app.get("sqlite");
  const sequelize = new Sequelize(connectionString, {
    dialect: "sqlite",
    logging: false,
    models: [path.join(__dirname, "models")],
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf(".model")) === member.toLowerCase();
    },
  });

  app.set("sequelizeSync", sequelize.sync());
}
