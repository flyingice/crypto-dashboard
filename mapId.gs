// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyMap
// Utilizing CMC ID instead of cryptocurrency symbols is the recommended way to interact with other endpoints
function getIdMap() {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  const res = reply.data;
  const values = res.map(entry => {
    return [entry.id, entry.symbol];
  });

  // write to the destination sheet
  const sheet = getSheetHandler(SHEET_IDMAP);
  // row and column index both starts from 1
  sheet.getRange(1, 1, values.length, 2).setValues(values);
}
