const express = require("express");
const { startServer } = require("./DataBase");
const {
  generateTableHTML,
  generateTableData,
  createGraph,
  exportGraphAndTableToPDF,
  prepareChartData,
} = require("./PdfCreation");

async function createReport() {
  hospitalPath =
    "./data/hospital_" +
    JSON.parse(sessionStorage.getItem("user")).hospitalId +
    ".json";
  const resultHospitalJson = JSON.parse(fs.readFileSync(hospitalPath, "utf-8"));
  const chartData = await prepareChartData(resultHospitalJson);
  await createGraph(chartData);
  const tableData = await generateTableData(resultHospitalJson);
  await generateTableHTML(tableData);
  await exportGraphAndTableToPDF();
}

module.exports = {
  createReport,
};
