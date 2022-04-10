const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

function installDashboard() {
  triggerManager.deployTrigger();
  chartManager.drawCharts();
}

function uninstallDashboard() {
  triggerManager.deleteTrigger();
  chartManager.clearCharts();
}

function refreshDashboard() {
  quoteFetcher.updateQuote();
  portfolioHistoryGenerator.appendHistory();
}

function generateIdMap() {
  idMapGenerator.generateIdMap();
}
