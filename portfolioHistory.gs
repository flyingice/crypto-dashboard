function getDate_() {
  const [date] = new Date().toISOString().split('T');
  return date;
}

function retrieveStatus_() {
  const sheet = getSheetHandler_(SHEET_STATUS);

  const date = getDate_();
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

function appendHistory_() {
  const status = retrieveStatus_();

  const sheet = getSheetHandler_(SHEET_PORTFOLIOHISTORY);
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, 4).setValues(
    [[status.date, status.total, status.crypto, status.stablecoin]]
  );
}
