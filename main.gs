/*
 * This file contains exposed API
 */

// run this function to install triggers and the dashboard
function installDashboard() {
  deployTriggers();
  drawCharts();
}

function refreshDashboard() {
  updateQuotes('USD');
  appendHistory();
}
