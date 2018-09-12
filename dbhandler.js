const sqlite = require('sqlite3');
var fs = require('fs');

if(!fs.existsSync('./ovh.db')){
    console.error("ovh.db is missing, please make sure this file is in the root of the directory");
    process.exit(-1);
}

const db = new sqlite.Database('./ovh.db');

