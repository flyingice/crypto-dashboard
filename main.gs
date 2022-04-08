/*
 * This file contains exposed API
 */

// run this function to install triggers and the dashboard
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
