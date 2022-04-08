// clear the terrain
function clearCharts_(sheetName) {
  const sheet = getSheetHandler_(sheetName);
  const charts = sheet.getCharts();
  charts.forEach(chart => {
    sheet.removeChart(chart);
  });
}

function drawPortfolioChart_() {
  origin = getSheetHandler_(SHEET_PORTFOLIO);
  dest = getSheetHandler_(SHEET_DASHBOARD);

  // total position
  let builder = dest.newChart().asPieChart();
  builder.addRange(origin.getRange("E2:E")).addRange(origin.getRange("A2:A"))
    .set3D()
    .setTitle('Total Position')
    .setOption('legendTextStyle', { bold: true})
    .setOption('titleTextStyle', { bold: true})
    .setPosition(1, 1, 0, 0);
  dest.insertChart(builder.build());

  // position without stablecoin
  builder = dest.newChart().asPieChart()
  builder.addRange(origin.getRange("E3:E")).addRange(origin.getRange("A3:A"))
    .set3D()
    .setTitle('Position without Stablecoin')
    .setOption('legendTextStyle', { bold: true})
    .setOption('titleTextStyle', { bold: true})
    .setPosition(1, 8, 0, 0);
  dest.insertChart(builder.build());
}

function drawStatusChart_() {
  // API doesn't support Charts.ChartType.SCORECARD
  // https://developers.google.com/apps-script/reference/charts/chart-type.html
}

function drawHistoryChart_() {
  origin = getSheetHandler_(SHEET_PORTFOLIOHISTORY);
  dest = getSheetHandler_(SHEET_DASHBOARD);

  // total position
  let builder = dest.newChart().asLineChart();
  builder.addRange(origin.getRange("B:B"))
    .setCurveStyle(Charts.CurveStyle.SMOOTH)
    .setPosition(20, 1, 0, 0);
  dest.insertChart(builder.build());

  // position without stablecoin
  builder = dest.newChart().asLineChart();
  builder.addRange(origin.getRange("C:C"))
    .setCurveStyle(Charts.CurveStyle.SMOOTH)
    .setPosition(20, 8, 0, 0);
  dest.insertChart(builder.build());
}

function drawCharts_() {
  clearCharts_(SHEET_DASHBOARD);

  drawPortfolioChart_();
  drawStatusChart_();
  drawHistoryChart_();
}
