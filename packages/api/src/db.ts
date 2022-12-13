import path from "path";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [path.join(__dirname, "../../models/*.ts")],
  synchronize: true,
  logging: true,
});

console.log("path: ", __dirname + "../../models/*.ts");
