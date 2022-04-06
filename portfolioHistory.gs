function getPortfolioTotal() {
  return getSheetHandler('Portfolio').getRangeByName('Total').getValue();
}

function getDate() {
  const [date] = new Date().toISOString().split('T');
  return date;
}

// The script should run after the completion of quote.gs
function appendHistory() {
  const sheet = getSheetHandler('PortfolioHistory');
  const numRows = sheet.getDataRange().getNumRows();
  sheet.getRange(numRows + 1, 1, 1, 2).setValues([[getDate(), getPortfolioTotal()]]);
}
