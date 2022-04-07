function getDate() {
  const [date] = new Date().toISOString().split('T');
  return date;
}

// The script should run after the completion of quote.gs
function appendHistory() {
  const sheet = getSheetHandler(SPREADSHEET, SHEET_PORTFOLIOHISTORY);

  const date = getDate();
  const total = sheet.getRange("B1").getValue();
  const crypto = sheet.getRange("C1").getValue();
  const stablecoin = sheet.getRange("D1").getValue();

  sheet.getRange(sheet.getLastRow() + 1, 1, 1, 4).setValues([[date, total, crypto, stablecoin]]);
}
