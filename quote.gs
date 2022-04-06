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

// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyMap
// Utilizing CMC ID instead of cryptocurrency symbols is the recommended way to interact with other endpoints
function getIdMap() {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  const res = reply.data;
  const values = res.map(entry => {
    return [entry.id, entry.symbol];
  });

  // write to the destination sheet
  const sheet = getSheetHandler('IDMap');
  // row and column index both starts from 1
  sheet.getRange(1, 1, values.length, 2).setValues(values);
}

// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
function getQuotesForList(idList, currency) {
  const ids = idList.join();
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${ids}&convert=${currency}`;
  console.log(url);
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  return reply;
}

function getQuotes(currency = 'USD') {
  const sheet = getSheetHandler('Portfolio');

  // retrieve a predefined list of crypto ids
  const numRows = sheet.getDataRange().getNumRows();
  const values = sheet.getRange(2, 4, numRows - 1, 1).getValues();
  const idList = values.map(row => row[0]);

  const reply = getQuotesForList(idList, currency);

  // write to the destination sheet
  const quotes = idList.map(id => {
    return [reply.data[id].quote[currency].price];
  });
  sheet.getRange(2, 2, quotes.length, 1).setValues(quotes);
}

function refresh() {
  getQuotes('USD');
}

