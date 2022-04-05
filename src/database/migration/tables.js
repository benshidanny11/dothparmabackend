// import config from "../connection/config";
// import {
//   createUserTable,
//   CreatePatientTable,
//   createDoctorTable,
//   createPharmaciesTable,
//   createMedicinesTable,
//   createOrdersTable,
//   createAppointmentTable,
//   createMedicinePharmacyTable,
//   createHealthTipsTable,
//   dropUserTable,
//   dropPatientsTable,
//   dropDoctorsTable,
//   dropMedicinesTable,
//   dropPharmaciesTable,
//   dropOrdersTbale,
//   dropAppointmentsTable,
//   dropMedicinePharmacieTable,
//   dropHealthTable
// } from "../queries/tables";
// import connection from "../connection/connection";
// const pool = connection.getPoolConnection();
// class CREATETABLE {
//   constructor() {
//     this.createTables = {
//       all: async () => {
//         await pool.connect();
//         await  pool.query(createUserTable);
//         await  pool.query(CreatePatientTable);
//         await  pool.query(createDoctorTable);
//         await  pool.query(createPharmaciesTable);
//         await  pool.query(createMedicinesTable);
//         await  pool.query(createOrdersTable);
//         await  pool.query(createAppointmentTable);
//         await  pool.query(createMedicinePharmacyTable);
//         await  pool.query(createHealthTipsTable);
     
//       },

//     };
//     this.dropTables = {
//       all: async () => {
//         await pool.connect();
//         await pool.query(dropPatientsTable);
//         await pool.query(dropHealthTable);
//         await pool.query(dropMedicinePharmacieTable);
//         await pool.query(dropAppointmentsTable);
//         await pool.query(dropOrdersTbale);
//         await pool.query(dropPharmaciesTable);
//         await pool.query(dropMedicinesTable);
//         await pool.query(dropDoctorsTable);
//         await pool.query(dropUserTable);
//       },
//     };
//   }
// }
// export default new CREATETABLE();