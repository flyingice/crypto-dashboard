function getDate() {
  const [date] = new Date().toISOString().split('T');
  return date;
}

function retrieveStatus() {
  const sheet = getSheetHandler(SHEET_STATUS);

  const date = getDate();
  const total = sheet.getRange("B1").getValue();
  const crypto = sheet.getRange("C1").getValue();
  const stablecoin = sheet.getRange("D1").getValue();

  return {
    date,
    total,
    crypto,
    stablecoin
  };
}

function appendHistory() {
  const status = retrieveStatus();

  const sheet = getSheetHandler(SHEET_PORTFOLIOHISTORY);
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, 4).setValues(
    [[status.date, status.total, status.crypto, status.stablecoin]]
  );
}
