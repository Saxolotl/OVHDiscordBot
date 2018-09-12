const sqlite = require('sqlite3');

var fs = require('fs');

if(!fs.existsSync('./ovh.db')){
    console.error("ovh.db is missing, please make sure this file is in the root of the directory");
    process.exit(-1);
}

const db = new sqlite.Database('./ovh.db');

var methods={
    updateRow : function(backendName, available){
        backendName = backendName.slice(4,10);

        var sql = 'UPDATE servers SET available=? WHERE backendName=?';
        var data = [available, backendName];

        db.run(sql, data, function(err){
            if(err) {
                return console.error(err.message);
            }

            console.log("Updated: " +  + this.changes);
        });
    }
};

module.exports = methods;