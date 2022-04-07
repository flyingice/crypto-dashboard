// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
function getQuotes(idList, currency = 'USD') {
  const ids = idList.join();
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${ids}&convert=${currency}`;
  console.log(url);
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  return idList.map(id => reply.data[id].quote[currency].price);
}

function updateQuotes(currency = 'USD') {
  const sheet = getSheetHandler(SPREADSHEET1, 'Portfolio');

  // retrieve a predefined list of crypto ids
  const numRows = sheet.getDataRange().getNumRows();
  const values = sheet.getRange(2, 4, numRows - 1, 1).getValues();
  const idList = values.map(row => row[0]); // TODO: handle empty rows

  let quotes = getQuotes(idList, currency);

  // write to the destination sheet
  quotes = quotes.map(quote => [quote]);
  sheet.getRange(2, 2, quotes.length, 1).setValues(quotes);
}

function refresh() {
  updateQuotes('USD');
}
