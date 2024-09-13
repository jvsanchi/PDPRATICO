import { DataSource } from "typeorm";
import { AppDataSource } from "./src/db/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default AppDataSource;
