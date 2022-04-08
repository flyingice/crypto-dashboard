const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

const SHEET_PORTFOLIO = 'Portfolio';  // main driven table
const SHEET_PORTFOLIOHISTORY = 'PortfolioHistory';
const SHEET_STATUS = 'Status';
const SHEET_IDMAP = 'IdMap';
const SHEET_DASHBOARD = 'Dashboard';

// structure of the main driven table
const ROW_TITLE = 1;
const ROW_DATA = 2;
const COLUMN_SYMBOL = 5;
const COLUMN_ID = COLUMN_SYMBOL - 1;
const COLUMN_AMOUNT = COLUMN_SYMBOL - 2;
const COLUMN_QUOTE = COLUMN_SYMBOL - 3;
const COLUMN_POSITION = COLUMN_SYMBOL - 4;

function getSheetHandler_(sheetName = '') {
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
