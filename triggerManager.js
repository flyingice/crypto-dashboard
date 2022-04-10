const triggerManager = {
  deleteTrigger() {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  },

  /* We can not use simple trigger (e.g., onEdit()) to call UrlFetch.
  * Use installable triggers instead
  * https://developers.google.com/apps-script/guides/triggers
  */
  deployTrigger() {
    this.deleteTrigger();

    // rebuild id map on montly basis
    ScriptApp.newTrigger('generateIdMap').timeBased().onMonthDay(1).atHour(0).create();

    // refresh dashboard on daily basis
    ScriptApp.newTrigger('refreshDashboard').timeBased().everyDays(1).atHour(1).create();

    // automatically update row data when inserting new crypto
    ScriptApp.newTrigger('addCrypto').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  },
};
