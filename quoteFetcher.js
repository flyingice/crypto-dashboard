const quoteFetcher = {
  // API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
  fetchQuote(idList, currency = 'USD') {
    const ids = idList.filter(id => id).join();
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${ids}&convert=${currency}`;
    console.log(url);
    const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

    return idList.map(id => {
      return reply.data.hasOwnProperty(id) ? reply.data[id].quote[currency].price : '';
    });
  },

  updateQuote(currency = 'USD') {
    const sheet = sheetManager.portfolio;

    // retrieve a predefined list of crypto ids
    const values = sheet.getRange(sheetManager.portfolioSchema.rowStablecoin,
      sheetManager.portfolioSchema.columnId,
      sheet.getLastRow() - sheetManager.portfolioSchema.rowStablecoin + 1, 1).getValues();
    const idList = values.map(row => row[0]);

    const quotes = this.fetchQuote(idList, currency);

    // write to the destination sheet
    const res = quotes.map(quote => [quote]);
    sheet.getRange(sheetManager.portfolioSchema.rowStablecoin, 
      sheetManager.portfolioSchema.columnQuote, res.length, 1).setValues(res);
  },
};
