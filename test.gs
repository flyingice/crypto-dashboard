function retrieveSymbols() {
  const sheet = getSheetHandler(SPREADSHEET, SHEET_PORTFOLIO);
  const values = sheet.getRange(ROW_DATA, COLUMN_SYMBOL, sheet.getLastRow() - ROW_DATA + 1, 1).getValues();

  return values.map(value => value[0]);
}

function testGetIds() {
  const symbols = retrieveSymbols();
  const ids = getIds(symbols);

  for(let i = 0; i < symbols.length; i++) {
    console.log(`${symbols[i]}: ${ids[i]}`);
  }
}

function testGetQuotes() {
  const idList = [52];
  const [quote] = getQuotes(idList);
  console.log(quote);
}
