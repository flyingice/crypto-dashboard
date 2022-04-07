const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

// extracted from the url: https://docs.google.com/spreadsheets/d/[id]/edit#gid=[gid]
const SPREADSHEET1 = '139SH2ul5PoSAtZ5jy75MWqnHVWpeELCXA20pJd3g6lM';  // Crypto
const SPREADSHEET2 = '1DW0sdOJ6YGRAoOWJODZYZ-_8h7hRpvL47flnsrO--yI';  // IDMap

function getSheetHandler(spreadsheetId, sheetName = '') {
  // don't call SpreadsheetApp.getActiveSpreadsheet() as the script is time-triggered
  const spreadSheet = SpreadsheetApp.openById(spreadsheetId);

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

// The result returned is not guaranted to be correct as
// there may be duplicate entries in the map, e.g., LUNA, POP, SHD
function getIds(symbolList) {
  const sheet = getSheetHandler(SPREADSHEET2);
  const values = sheet.getDataRange().getValues();

  const ids = symbolList.map(crypto => {
    const id = values.findIndex(value => value[1] == crypto);
    return id < 0 ? id : values[id][0];
  });

  return ids;
}

// help to clear the terrain for debug purposes
function clearCharts(sheetName = 'Test') {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const charts = sheet.getCharts();
  charts.forEach(chart => {
    sheet.removeChart(chart);
  });
}
