const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

// extracted from the url: https://docs.google.com/spreadsheets/d/[id]/edit#gid=[gid]
const SPREADSHEET1 = '139SH2ul5PoSAtZ5jy75MWqnHVWpeELCXA20pJd3g6lM';  // Crypto

function getSheetHandler(spreadsheetId, sheetName) {
  // don't call SpreadsheetApp.getActiveSpreadsheet() as the script is time-triggered
  const spreadSheet = SpreadsheetApp.openById(spreadsheetId);
  let sheet = spreadSheet.getSheetByName(sheetName);
  // create if it doesn't exist
  if (!sheet) {
    sheet = spreadSheet.insertSheet(sheetName);
  }

  return sheet;
}

// help to clear the terrain for debug purposes
function clearCharts(sheetName = 'test') {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const charts = sheet.getCharts();
  charts.forEach(chart => {
    sheet.removeChart(chart);
  });
}
