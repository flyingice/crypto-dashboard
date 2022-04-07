function getSheetHandler(sheetName = '') {
  const spreadSheet = SpreadsheetApp.getActive();

  let sheet;
  if(!sheetName) {
    sheet = spreadSheet.getActiveSheet();
  } else {
    sheet = spreadSheet.getSheetByName(sheetName);
    // create if it doesn't exist
    if (!sheet) {
      sheet = spreadSheet.insertSheet(sheetName);
    }
  }

  return sheet;
}

// help to clear the terrain for debug purposes
function clearCharts(sheetName) {
  const sheet = getSheetHandler(sheetName);
  const charts = sheet.getCharts();
  charts.forEach(chart => {
    sheet.removeChart(chart);
  });
}
