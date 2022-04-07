// help to clear the terrain for debug purposes
function clearCharts(sheetName) {
  const sheet = getSheetHandler(sheetName);
  const charts = sheet.getCharts();
  charts.forEach(chart => {
    sheet.removeChart(chart);
  });
}
