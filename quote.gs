// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
function getQuotes(idList, currency = 'USD') {
  const ids = idList.filter(id => id).join();
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${ids}&convert=${currency}`;
  console.log(url);
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  return idList.map(id => {
    return reply.data.hasOwnProperty(id) ? reply.data[id].quote[currency].price : '';
  });
}

function updateQuotes(currency = 'USD') {
  const sheet = getSheetHandler(SHEET_PORTFOLIO);

  // retrieve a predefined list of crypto ids
  const values = sheet.getRange(ROW_DATA, COLUMN_ID, sheet.getLastRow() - ROW_DATA + 1, 1).getValues();
  const idList = values.map(row => row[0]);

  const quotes = getQuotes(idList, currency);

  // write to the destination sheet
  const res = quotes.map(quote => [quote]);
  sheet.getRange(ROW_DATA, COLUMN_QUOTE, res.length, 1).setValues(res);
}

function refresh() {
  updateQuotes('USD');
}
