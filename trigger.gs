function deleteTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
}

/* We can not use simple trigger (e.g., onEdit()) to call UrlFetch.
 * Use installable triggers instead
 * https://developers.google.com/apps-script/guides/triggers
 */
function deployTriggers() {
  deleteTriggers();

  const launchHour = 0;
  // rebuild id map on montly basis
  ScriptApp.newTrigger('buildIdMap').timeBased().onMonthDay(1).create();
  // refresh quote on daily basis
  ScriptApp.newTrigger('refresh').timeBased().everyDays(1).atHour(launchHour).create();
  // update portfolio history following quotes refresh
  ScriptApp.newTrigger('appendHistory').timeBased().everyDays(1).atHour(launchHour + 1).create();
  
  // automatically update row data when inserting new crypto
  ScriptApp.newTrigger('addNewCrypto').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
}
