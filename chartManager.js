const chartManager = {
  // clear the terrain
  clearCharts() {
    const sheet = sheetManager.dashboard;
    const charts = sheet.getCharts();
    charts.forEach(chart => {
      sheet.removeChart(chart);
    });
  },

  drawPortfolioChart() {
    const origin = sheetManager.portfolio;
    const dest = sheetManager.dashboard;

    const col1 = sheetManager.getColIndex(sheetManager.portfolioSchema.columnPosition);
    const col2 = sheetManager.getColIndex(sheetManager.portfolioSchema.columnSymbol);
    const row1 = sheetManager.portfolioSchema.rowStablecoin;
    const row2 = sheetManager.portfolioSchema.rowNonStablecoin;

    // total position
    let builder = dest.newChart().asPieChart();
    builder.addRange(origin.getRange(`${col2}${row1}:${col2}`))
      .addRange(origin.getRange(`${col1}${row1}:${col1}`))
      .set3D()
      .setTitle('Total Position')
      .setOption('legendTextStyle', { bold: true})
      .setOption('titleTextStyle', { bold: true})
      .setPosition(1, 1, 0, 0);
    dest.insertChart(builder.build());

    // position without stablecoin
    builder = dest.newChart().asPieChart()
    builder.addRange(origin.getRange(`${col2}${row2}:${col2}`))
      .addRange(origin.getRange(`${col1}${row2}:${col1}`))
      .set3D()
      .setTitle('Position without Stablecoin')
      .setOption('legendTextStyle', { bold: true})
      .setOption('titleTextStyle', { bold: true})
      .setPosition(1, 8, 0, 0);
    dest.insertChart(builder.build());
  },

  drawStatusChart() {
    // API doesn't support Charts.ChartType.SCORECARD
    // https://developers.google.com/apps-script/reference/charts/chart-type.html
  },

  drawHistoryChart() {
    const origin = sheetManager.portfolioHistory;
    const dest = sheetManager.dashboard;

    const col1 = sheetManager.getColIndex(sheetManager.portfolioHistorySchema.columnTotal);
    const col2 = sheetManager.getColIndex(sheetManager.portfolioHistorySchema.columnCrypto);

    // total position
    let builder = dest.newChart().asLineChart();
    builder.addRange(origin.getRange(`${col1}:${col1}`))
      .setCurveStyle(Charts.CurveStyle.SMOOTH)
      .setPosition(20, 1, 0, 0);
    dest.insertChart(builder.build());

    // position without stablecoin
    builder = dest.newChart().asLineChart();
    builder.addRange(origin.getRange(`${col2}:${col2}`))
      .setCurveStyle(Charts.CurveStyle.SMOOTH)
      .setPosition(20, 8, 0, 0);
    dest.insertChart(builder.build());
  },

  drawCharts() {
    this.clearCharts();

    this.drawPortfolioChart();
    this.drawStatusChart();
    this.drawHistoryChart();
  },
};
