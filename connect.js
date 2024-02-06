// import mysql from "mysql";
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "property",
// });
import { createPool } from "mysql";

export const db = createPool({
  host: "156.67.64.3",
  user: "u604430330_propertyease",
  password: "wX=5[ULr>",
  database: "u604430330_property",
  connectionLimit: 1000,
});
