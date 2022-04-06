function getSheetHandler(sheetName) {
  // extracted from the url: https://docs.google.com/spreadsheets/d/[id]/edit#gid=[gid]
  const spreadSheetId = '139SH2ul5PoSAtZ5jy75MWqnHVWpeELCXA20pJd3g6lM';

  // don't call SpreadsheetApp.getActiveSpreadsheet() as the script is time-triggered
  const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  let sheet = spreadSheet.getSheetByName(sheetName);
  // create if it doesn't exist
  if (!sheet) {
    sheet = spreadSheet.insertSheet(sheetName);
  }

  return sheet;
}

function getPortfolioTotal() {
  return getSheetHandler('Portfolio').getRangeByName('Total').getValue();
}

function getDate() {
  const [date] = new Date().toISOString().split('T');
  return date;
}

// The script should run after the completion of quote.gs
function appendHistory() {
  const sheet = getSheetHandler('PortfolioHistory');
  const numRows = sheet.getDataRange().getNumRows();
  sheet.getRange(numRows + 1, 1, 1, 2).setValues([[getDate(), getPortfolioTotal()]]);
}
