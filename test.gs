function retrieveSymbols() {
  const sheet = getSheetHandler(SHEET_PORTFOLIO);
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
  const symbols = retrieveSymbols();
  const ids = getIds(symbols);
  // fill in empty string on purpose
  const culprit = ['', '', '4687', ''];
  culprit.forEach(id => ids.push(id));
  const quotes = getQuotes(ids);
  console.log(quotes);
}
