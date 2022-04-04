import TABLES from "./tables";

TABLES.dropTables["all"]().then(() => {
   console.log("All table are drop successfully.");
   process.exit();
});