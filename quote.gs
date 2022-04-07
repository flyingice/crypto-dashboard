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

/* We can not use simple trigger (e.g., onEdit()) to call UrlFetch.
 * Use installable triggers instead
 * https://developers.google.com/apps-script/guides/triggers
 */
function deployTriggers() {
  ScriptApp.newTrigger('addNewCrypto').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
}

function addNewCrypto(event) {
  const crypto = event.value.toUpperCase();
  const range = event.range;
  const sheet = range.getSheet();

  const r = range.getRow();
  const c = range.getColumn();

  if(sheet.getSheetName() == 'Test' && c == 5) {
    // retrieve id
    const [id] = getIds([crypto]);
    if(id < 0) {
      range.setNote('crypto symbol is not valid.');
      return;
    }
    // retrieve quote
    const [quote] = getQuotes([id]);

    // calculate total amount of the given crypto
    const width = sheet.getLastColumn();
    range.setNote(width);
    let sum = 0;
    if(width > 5) {
      const values = sheet.getRange(r, 6, 1, width - 5).getValues();
      sum = values[0].reduce((accumulator, current) => Number(accumulator) + Number(current));
    }

    // update table
    sheet.getRange(r, c).setValue(crypto);
    sheet.getRange(r, c - 1).setValue(id);
    sheet.getRange(r, c - 2).setValue(quote);
    sheet.getRange(r, c - 3).setValue(sum);
    sheet.getRange(r, c - 4).setValue(sum * quote);
  }
}
