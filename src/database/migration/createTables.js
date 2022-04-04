import TABLES from "./tables";

TABLES.createTables["all"]().then(() => {
  console.log("All table are created successfully.");
  process.exit();
});