function isidMapValid_() {
  const sheet = getSheetHandler_(SHEET_IDMAP);
  // data is probably corrupted with low row count
  return sheet.getDataRange().getNumRows() > 5000;
}

// API reference: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyMap
// Utilizing CMC ID instead of cryptocurrency symbols is the recommended way to interact with other endpoints
function buildIdMap_() {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
  const reply = JSON.parse(UrlFetchApp.fetch(url, PARAMS).getContentText());

  const res = reply.data;
  const values = res.map(entry => {
    return [entry.id, entry.symbol];
  });

  // write to the destination sheet
  const sheet = getSheetHandler_(SHEET_IDMAP);
  // row and column index both starts from 1
  sheet.getRange(1, 1, values.length, 2).setValues(values);
}

// The result returned is not guaranted to be correct as
// there may be duplicate entries in the map, e.g., LUNA, POP, SHD
function getIds_(symbolList) {
  if(!isidMapValid_()) {
    console.log('building id map...');
    buildIdMap_();
  }

  const sheet = getSheetHandler_(SHEET_IDMAP);
  const values = sheet.getDataRange().getValues();

  const ids = symbolList.map(crypto => {
    const id = values.findIndex(value => value[1] == crypto);
    return id < 0 ? id : values[id][0];
  });

  return ids;
}
