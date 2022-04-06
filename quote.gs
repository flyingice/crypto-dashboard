// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
function getQuotesForList(idList, currency) {
  const ids = idList.join();
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${ids}&convert=${currency}`;
  console.log(url);
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  return reply;
}

function getQuotes(currency = 'USD') {
  const sheet = getSheetHandler(SPREADSHEET1, 'Portfolio');

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

