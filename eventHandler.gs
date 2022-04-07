/* We can not use simple trigger (e.g., onEdit()) to call UrlFetch.
 * Use installable triggers instead
 * https://developers.google.com/apps-script/guides/triggers
 */
function deployTriggers() {
  ScriptApp.newTrigger('addNewCrypto').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
}

// automatically update row data when inserting new crypto
function addNewCrypto(event) {
  const crypto = event.value.toUpperCase(); // normalize crypto symbol
  const range = event.range;
  const sheet = range.getSheet();

  const r = range.getRow();
  const c = range.getColumn();

  if(!event.oldValue && sheet.getSheetName() === SHEET_PORTFOLIO && c === COLUMN_SYMBOL && r >= ROW_DATA) {
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
