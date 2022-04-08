function retrieveSymbols_() {
  const sheet = getSheetHandler_(SHEET_PORTFOLIO);
  const values = sheet.getRange(ROW_DATA, COLUMN_SYMBOL, sheet.getLastRow() - ROW_DATA + 1, 1).getValues();

  return values.map(value => value[0]);
}

function testGetIds_() {
  const symbols = retrieveSymbols_();
  const ids = getIds_(symbols);

  for(let i = 0; i < symbols.length; i++) {
    console.log(`${symbols[i]}: ${ids[i]}`);
  }
}

function testGetQuotes_() {
  const symbols = retrieveSymbols_();
  const ids = getIds_(symbols);
  // fill in empty string on purpose
  const culprit = ['', '', '4687', ''];
  culprit.forEach(id => ids.push(id));
  const quotes = getQuotes_(ids);
  console.log(quotes);
}
