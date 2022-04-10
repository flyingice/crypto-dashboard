const sheetManager = {
  get portfolio() {
    return this.getHandler('Portfolio');  // main driven table
  },

  get portfolioHistory() {
    return this.getHandler('PortfolioHistory');
  },

  get status() {
    return this.getHandler('Status');
  },

  get idMap() {
    return this.getHandler('IdMap');
  },

  get dashboard() {
    return this.getHandler('Dashboard');
  },

  getHandler(name) {
    const spreadSheet = SpreadsheetApp.getActive();

    let sheet;
    if(!name) {
      sheet = spreadSheet.getActiveSheet();
    } else {
      sheet = spreadSheet.getSheetByName(name);
      // create if it doesn't exist
      if (!sheet) {
        sheet = spreadSheet.insertSheet(name);
      }
    }

    return sheet;
  },

  getColIndex(offset) {
    return String.fromCharCode('A'.charCodeAt() - 1 + offset);
  },

  portfolioSchema: {  // scheme of the main driven table
    columnPosition: 1,
    columnQuote: 2,
    columnAmount: 3,
    columnId: 4,
    columnSymbol: 5,
    columnChain: 6,
    rowTitle: 1,
    rowStablecoin: 2,
    rowNonStablecoin: 3,
  },

  portfolioHistorySchema: {
    columnDate: 1,
    columnTotal: 2,
    columnCrypto: 3,
    columnStablecoin: 4,
  },

  statusSchema: {
    columnTotal: 2,
    columnCrypto: 3,
    columnStablecoin: 4,
    rowData: 2,
  },
};
