const portfolioHistoryGenerator = {
  getDate() {
    return new Date().toISOString();
  },

  retrieveStatus() {
    const sheet = sheetManager.status;

    const date = this.getDate();
    const total = sheet.getRange(`${sheetManager.getColIndex(sheetManager.statusSchema.columnTotal)}${sheetManager.statusSchema.rowData}`).getValue();
    const crypto = sheet.getRange(`${sheetManager.getColIndex(sheetManager.statusSchema.columnCrypto)}${sheetManager.statusSchema.rowData}`).getValue();
    const stablecoin = sheet.getRange(`${sheetManager.getColIndex(sheetManager.statusSchema.columnStablecoin)}${sheetManager.statusSchema.rowData}`).getValue();

    return {
      date,
      total,
      crypto,
      stablecoin
    };
  },

  appendHistory() {
    const status = this.retrieveStatus();
    const sheet = sheetManager.portfolioHistory;
    const row = sheet.getLastRow() + 1;

    sheet.getRange(`${sheetManager.getColIndex(sheetManager.portfolioHistorySchema.columnDate)}${row}`).setValue(status.date);
    sheet.getRange(`${sheetManager.getColIndex(sheetManager.portfolioHistorySchema.columnTotal)}${row}`).setValue(status.total);
    sheet.getRange(`${sheetManager.getColIndex(sheetManager.portfolioHistorySchema.columnCrypto)}${row}`).setValue(status.crypto);
    sheet.getRange(`${sheetManager.getColIndex(sheetManager.portfolioHistorySchema.columnStablecoin)}${row}`).setValue(status.stablecoin);
  },
};
