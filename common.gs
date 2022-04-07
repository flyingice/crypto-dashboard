const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

const SHEET_PORTFOLIO = 'Portfolio';  // main driven table
const SHEET_PORTFOLIOHISTORY = 'PortfolioHistory';
const SHEET_IDMAP = 'IdMap';

// structure of the main driven table
const ROW_TITLE = 1;
const ROW_DATA = 2;
const COLUMN_SYMBOL = 5;
const COLUMN_ID = COLUMN_SYMBOL - 1;
const COLUMN_AMOUNT = COLUMN_SYMBOL - 2;
const COLUMN_QUOTE = COLUMN_SYMBOL - 3;
const COLUMN_POSITION = COLUMN_SYMBOL - 4;

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

// The result returned is not guaranted to be correct as
// there may be duplicate entries in the map, e.g., LUNA, POP, SHD
function getIds(symbolList) {
  const sheet = getSheetHandler(SHEET_IDMAP);
  const values = sheet.getDataRange().getValues();

  const ids = symbolList.map(crypto => {
    const id = values.findIndex(value => value[1] == crypto);
    return id < 0 ? id : values[id][0];
  });

  return ids;
}

// help to clear the terrain for debug purposes
function clearCharts(sheetName) {
  const sheet = getSheetHandler();
  const charts = sheet.getCharts();
  charts.forEach(chart => {
    sheet.removeChart(chart);
  });
}
