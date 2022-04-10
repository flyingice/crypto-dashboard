function retrieveSymbols_() {
  const sheet = sheetManager.portfolio;
  const values = sheet.getRange(sheetManager.portfolioSchema.rowStablecoin,
    sheetManager.portfolioSchema.columnSymbol, 
    sheet.getLastRow() - sheetManager.portfolioSchema.rowStablecoin + 1, 1).getValues();

  return values.map(value => value[0]);
}

function idMapGeneratorTest_() {
  const symbols = retrieveSymbols_();
  const ids = idMapGenerator.getId(symbols);

  for(let i = 0; i < symbols.length; i++) {
    console.log(`${symbols[i]}: ${ids[i]}`);
  }
}

function quoteFetcherTest_() {
  const symbols = retrieveSymbols_();
  const ids = idMapGenerator.getId(symbols);
  // fill in empty string on purpose
  const culprit = ['', '', '4687', ''];
  culprit.forEach(id => ids.push(id));
  const quotes = quoteFetcher.fetchQuote(ids);
  console.log(quotes);
}
