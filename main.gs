/*
 * This file contains exposed API
 */

function installDashboard() {
  deployTriggers_();
  drawCharts_();
}

function uninstallDashboard() {
  deleteTriggers_();
  clearCharts_();
}

function refreshDashboard() {
  updateQuotes_();
  appendHistory_();
}

function buildIdMap() {
  buildIdMap_();
}
