import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
  logging: true,
});
