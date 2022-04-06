function retrieveSymbols() {
  const sheet = getSheetHandler(SPREADSHEET1, "Portfolio");
  const numRows = sheet.getDataRange().getNumRows();
  const values = sheet.getRange(2, 5, numRows - 1, 1).getValues();

  return values.map(value => value[0]);
}

function testGetIdForSymbols() {
  const symbols = retrieveSymbols();
  const ids = getIdForSymbols(symbols);

  for(let i = 0; i < symbols.length; i++) {
    console.log(`${symbols[i]}: ${ids[i]}`);
  }
}

