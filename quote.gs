// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
function getQuotes(idList, currency = 'USD') {
  const ids = idList.join();
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${ids}&convert=${currency}`;
  console.log(url);
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  return idList.map(id => reply.data[id].quote[currency].price);
}

function updateQuotes(currency = 'USD') {
  const sheet = getSheetHandler(SPREADSHEET, SHEET_PORTFOLIO);

  // retrieve a predefined list of crypto ids
  const values = sheet.getRange(ROW_DATA, COLUMN_ID, sheet.getLastRow() - ROW_DATA + 1, 1).getValues();
  const idList = values.map(row => row[0]); // TODO: handle empty rows

  let quotes = getQuotes(idList, currency);

  // write to the destination sheet
  quotes = quotes.map(quote => [quote]);
  sheet.getRange(ROW_DATA, COLUMN_QUOTE, quotes.length, 1).setValues(quotes);
}

function refresh() {
  updateQuotes('USD');
}

/* We can not use simple trigger (e.g., onEdit()) to call UrlFetch.
 * Use installable triggers instead
 * https://developers.google.com/apps-script/guides/triggers
 */
function deployTriggers() {
  ScriptApp.newTrigger('addNewCrypto').forSpreadsheet(SpreadsheetApp.openById(SPREADSHEET)).onEdit().create();
}

// automatically update row data when inserting new crypto
function addNewCrypto(event) {
  const crypto = event.value.toUpperCase(); // normalize crypto symbol
  const range = event.range;
  const sheet = range.getSheet();

  const r = range.getRow();
  const c = range.getColumn();

  if(!event.oldValue && sheet.getSheetName() === SHEET_PORTFOLIO && c === COLUMN_SYMBOL) {
    // retrieve id
    const [id] = getIds([crypto]);
    if(id < 0) {
      range.setNote('invalid crypto symbol');
      return;
    }
    // retrieve quote
    const [quote] = getQuotes([id]);
    // calculate total amount of the given crypto
    const width = sheet.getLastColumn();
    let amount = 0;
    if(width > COLUMN_SYMBOL) {
      const values = sheet.getRange(r, COLUMN_SYMBOL + 1, 1, width - COLUMN_SYMBOL).getValues();
      amount = values[0].reduce((accumulator, current) => Number(accumulator) + Number(current));
    }

    // update table
    sheet.getRange(r, COLUMN_SYMBOL).setValue(crypto);
    sheet.getRange(r, COLUMN_ID).setValue(id);
    sheet.getRange(r, COLUMN_AMOUNT).setValue(amount);
    sheet.getRange(r, COLUMN_QUOTE).setValue(quote);
    sheet.getRange(r, COLUMN_POSITION).setValue(amount * quote);
  }
}
