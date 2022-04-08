/*
 * This file contains exposed API
 */

// run this function to install triggers and the dashboard
function installDashboard() {
  deployTriggers_();
  drawCharts_();
}

function refreshDashboard() {
  updateQuotes_('USD');
  appendHistory_();
}
