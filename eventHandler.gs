function onOpen(event) {
  // create drop-down menu on the UI
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard')
    .addItem('Install', 'installDashboard')
    .addItem('Refresh', 'refreshDashboard')
    .addToUi();
}

function addNewCrypto(event) {
  const value = event.value
  const range = event.range;
  const sheet = range.getSheet();

  const r = range.getRow();
  const c = range.getColumn();

  if(value && !event.oldValue && sheet.getSheetName() === SHEET_PORTFOLIO && c === COLUMN_SYMBOL && r >= ROW_DATA) {
    // normalize crypto symbol
    const crypto = value.toUpperCase();
    // retrieve id
    const [id] = getIds_([crypto]);
    if(id < 0) {
      range.setNote('invalid crypto symbol');
      return;
    }
    // retrieve quote
    const [quote] = getQuotes_([id]);

    // update table
    sheet.getRange(r, COLUMN_SYMBOL).setValue(crypto);
    sheet.getRange(r, COLUMN_ID).setValue(id);
    sheet.getRange(r, COLUMN_AMOUNT).setValue(`=SUM(${getNextChar_('A', COLUMN_SYMBOL)}${r}:${r})`);
    sheet.getRange(r, COLUMN_QUOTE).setValue(quote);
    // update position
    const column = getNextChar_('A', COLUMN_POSITION - 1);
    const sourceRange = sheet.getRange(`${column}2`);
    const destRange = sheet.getRange(`${column}2:${column}`);
    sourceRange.autoFill(destRange, SpreadsheetApp.AutoFillSeries);
  }
}
