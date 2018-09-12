const sqlite = require('sqlite3');
const kimsufi = require('./servers/soyoustart.json');
var fs = require('fs');

if(!fs.existsSync('./ovh.db')){
    console.error("ovh.db is missing, please make sure this file is in the root of the directory");
    process.exit(-1);
}

const db = new sqlite.Database('./ovh.db');

db.each("SELECT * FROM servers", function(err, row){
    console.log("****" + row.backendName + " is: " + row.frontendName + " with " + row.provider);
});