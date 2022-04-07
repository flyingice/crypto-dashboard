function getPortfolioTotal() {
  const sheet = getSheetHandler(SPREADSHEET, SHEET_PORTFOLIO);
  return sheet.getRange(ROW_TITLE, COLUMN_SYMBOL).getValue();
}

function getDate() {
  const [date] = new Date().toISOString().split('T');
  return date;
}

// The script should run after the completion of quote.gs
function appendHistory() {
  const sheet = getSheetHandler(SPREADSHEET, SHEET_PORTFOLIOHISTORY);
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, 2).setValues([[getDate(), getPortfolioTotal()]]);
}
