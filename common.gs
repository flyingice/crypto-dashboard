const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

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
