BBD SQLite plugin
=================
> The SQLite plugin is a Secure Database object. Use this Object to manipulate the data.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-sqlite`

> __Note:__ `BBD Cordova SQLite plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-sqlite
```

API reference
=============
`window.openDatabase`
```javascript
/**
* @function GDSQLitePlugin#openDatabase
* @description This method will return a Secure Database object. Use the Database Object to manipulate the data.
* @property {string} dbPath The file path of the database.
* @property {string} version The version of the database.
* @property {string} displayName The display name of the database.
* @property {integer} size The size of the database in bytes.
* @param {function} creationCallback Success callback.
* @param {function} errorCallback Error callback.
*
* @example
* var db = window.openDatabase("testDB.db", "1.0", "CordovaDemo", 200000, function(){
*     console.log("DB is opened")
* }, null);
*/
```

`GDSQLitePlugin`
```javascript
/**
* @class GDSQLitePlugin
* @classdesc GDSQLitePlugin is a Secure Database object. Use this Object to manipulate the data.
* @property {string} name The name of the database.
* @property {string} version The version of the database.
* @property {string} displayName The display name of the database.
* @property {integer} size The size of the database in bytes.
*/
```

`GDSQLitePlugin.close`
```javascript
/**
* @function GDSQLitePlugin#close
* @description This method close database connection
* @param {function} onSuccess Called when database closed
* @param {function} onError Called error callback if error occurred.
*
* @example
* var db = window.openDatabase("testDB.db", "1.0", "CordovaDemo", 200000, function(){
*     console.log("DB is opened")
* }, null);
*
* db.close(function(){
*     console.log("DB is closed")
* }, null);
*/
```

`GDSQLitePlugin._deleteDB`
```javascript
/**
* @function GDSQLitePlugin#_deleteDB
* @description This method delete database
* @param {function} onSuccess Database deleted successfully.
* @param {function} onError Error callback.
*
* @example
* var db = window.openDatabase("testDB.db", "1.0", "CordovaDemo", 200000, function(){
*     console.log("DB is opened")
* }, null);
*
* db._deleteDB(function(){
*     console.log("DB is deleted")
* }, null);
*/
```

`GDSQLitePlugin.transaction`
```javascript
/**
* @function GDSQLitePlugin#transaction
* @Description Calls the GDSQLitePluginTransaction object instance
* @param {function} fn function that has the transaction as a parameter
* @param {function} error Error callback.
* @param {function} success Success callback.
*
* @example
* var db = window.openDatabase("testDB.db", "1.0", "CordovaDemo", 200000, function(){
*     console.log("DB is opened")
* }, null);
*
* var selectSQLsuccessCB = function(tx,result) {
*     console.log("Success");
* },
* insertSuccess = function(tx,result) {
*     if (result.rowsAffected) {
*         console.log(result.rowsAffected); // rows affected
*     }
* },
* updateSuccess = function(tx, result) {
*     console.log("Success");
* },
* querySuccess = function(tx,result) {
*     var len = result.rows.length,
*         one = 1, two = 2, three = 3, four = 4;
*
*     console.log(len); // 4
*
*     console.log(result.rows.item(0).id.toString());
*     console.log(result.rows.item(0).data);
*     console.log(result.rows.item(1).id.toString());
*     console.log(result.rows.item(1).data);
*     console.log(result.rows.item(2).id.toString());
*     console.log(result.rows.item(2).data);
*     console.log(result.rows.item(3).id.toString());
*     console.log(result.rows.item(3).data);
* },
* errorCB = function(tx, err) {
*     console.log("Error");
* },
* errorTCB = function(tx, err) {
*     console.log("Error");
* };
*
* db.transaction(function(tx){
*     tx.executeSql('DROP TABLE IF EXISTS DEMO',[],selectSQLsuccessCB,errorCB);
*     tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id integer primary key, data)',[],selectSQLsuccessCB,errorCB);
*     tx.executeSql('INSERT OR ROLLBACK INTO DEMO (id, data) VALUES (?,?)',[1, "First row"],insertSuccess,errorCB);
*     tx.executeSql('INSERT OR ROLLBACK INTO DEMO (id, data) VALUES (?,?)',[2, "Second row"],insertSuccess,errorCB);
*     tx.executeSql('INSERT OR REPLACE INTO DEMO (id, data) VALUES (?,?)',[3, "Third row"],insertSuccess,errorCB);
*     tx.executeSql('INSERT OR ROLLBACK INTO DEMO (id, data) VALUES (?,?)',[4, "Fourth row"],insertSuccess,errorCB);
*     tx.executeSql('UPDATE DEMO SET DATA = ?',["row updated"], updateSuccess, errorCB);
*     tx.executeSql('SELECT * FROM DEMO',[], querySuccess, errorCB);
* }, errorTCB, function(){
*     console.log("Transaction completed");
* });
*/
```

`GDSQLTransaction`
```javascript
/**
* @class GDSQLitePluginTransaction
* @classdesc GDSQLitePluginTransaction is an object that contains methods that allow the user to execute SQL statements against the secure Database.
* @property {string} db database object which the transaction is executing against.
*/
```

`GDSQLTransaction.executeSql`
```javascript
/**
* @function GDSQLitePluginTransaction#executeSql
* @Description Execute an SQL statements against the Secure Database.
* @param {string} sql SQL statement to execute.
* @param {array} values Array of arguments for the SQL statement parameters.
* @param {function} successk Success callback.
* @param {function} error Error callback.
*
* @example
* var db = window.openDatabase("testDB.db", "1.0", "CordovaDemo", 200000, function(){
*     console.log("DB is opened")
* }, null);
*
* var selectSQLsuccessCB = function(tx,result) {
*     console.log("Success");
* },
* insertSuccess = function(tx,result) {
*     if (result.rowsAffected) {
*         console.log(result.rowsAffected); // rows affected
*     }
* },
* updateSuccess = function(tx, result) {
*     console.log("Success");
* },
* querySuccess = function(tx,result) {
*     var len = result.rows.length,
*         one = 1, two = 2, three = 3, four = 4;
*
*     console.log(len); // 4
*
*     console.log(result.rows.item(0).id.toString());
*     console.log(result.rows.item(0).data);
*     console.log(result.rows.item(1).id.toString());
*     console.log(result.rows.item(1).data);
*     console.log(result.rows.item(2).id.toString());
*     console.log(result.rows.item(2).data);
*     console.log(result.rows.item(3).id.toString());
*     console.log(result.rows.item(3).data);
* },
* errorCB = function(tx, err) {
*     console.log("Error");
* },
* errorTCB = function(tx, err) {
*     console.log("Error");
* };
*
* db.transaction(function(tx){
*     tx.executeSql('DROP TABLE IF EXISTS DEMO',[],selectSQLsuccessCB,errorCB);
*     tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id integer primary key, data)',[],selectSQLsuccessCB,errorCB);
*     tx.executeSql('INSERT OR ROLLBACK INTO DEMO (id, data) VALUES (?,?)',[1, "First row"],insertSuccess,errorCB);
*     tx.executeSql('INSERT OR ROLLBACK INTO DEMO (id, data) VALUES (?,?)',[2, "Second row"],insertSuccess,errorCB);
*     tx.executeSql('INSERT OR REPLACE INTO DEMO (id, data) VALUES (?,?)',[3, "Third row"],insertSuccess,errorCB);
*     tx.executeSql('INSERT OR ROLLBACK INTO DEMO (id, data) VALUES (?,?)',[4, "Fourth row"],insertSuccess,errorCB);
*     tx.executeSql('UPDATE DEMO SET DATA = ?',["row updated"], updateSuccess, errorCB);
*     tx.executeSql('SELECT * FROM DEMO',[], querySuccess, errorCB);
* }, errorTCB, function(){
*     console.log("Transaction completed");
* });
*/
```
