function onOpen(event) {
  // create drop-down menu on the UI
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Dashboard')
    .addItem('Refresh', 'refreshDashboard')
    .addItem('Install', 'installDashboard')
    .addItem('Uninstall', 'uninstallDashboard')
    .addToUi();
}

function addCrypto(event) {
  const value = event.value;
  const range = event.range;
  const sheet = range.getSheet();

  const r = range.getRow();
  const c = range.getColumn();

  if(value && !event.oldValue && sheet.getSheetName() === sheetManager.portfolio.getSheetName()
      && c === sheetManager.portfolioSchema.columnSymbol && r >= sheetManager.portfolioSchema.rowStablecoin) {
    // normalize crypto symbol
    const crypto = value.toUpperCase();
    // retrieve id
    const [id] = idMapGenerator.getId([crypto]);
    if(id < 0) {
      range.setNote('invalid crypto symbol');
      return;
    }
    // retrieve quote
    const [quote] = quoteFetcher.fetchQuote([id]);

    // update portfolio table
    sheet.getRange(r, sheetManager.portfolioSchema.columnSymbol).setValue(crypto);
    sheet.getRange(r, sheetManager.portfolioSchema.columnId).setValue(id);
    sheet.getRange(r, sheetManager.portfolioSchema.columnAmount).setValue(
      `=SUM(${sheetManager.getColIndex(sheetManager.portfolioSchema.columnChain)}${r}:${r})`);
    sheet.getRange(r, sheetManager.portfolioSchema.columnQuote).setValue(quote);
    sheet.getRange(r, sheetManager.portfolioSchema.columnPosition).setValue(
      `=MULTIPLY(${sheetManager.getColIndex(sheetManager.portfolioSchema.columnQuote)}${r},\
      ${sheetManager.getColIndex(sheetManager.portfolioSchema.columnAmount)}${r})`);
  }
}
