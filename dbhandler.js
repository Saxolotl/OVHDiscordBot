const sqlite = require('sqlite3');

var fs = require('fs');

if(!fs.existsSync('./ovh.db')){
    console.error("ovh.db is missing, please make sure this file is in the root of the directory");
    process.exit(-1);
}

var db = new sqlite.Database('./ovh.db');
var servers = [];

var methods={
    updateRow : function(backendName, available){
        
        backendName = backendName.slice(4,10);

        var sql = 'UPDATE servers SET available=? WHERE backendName=?';
        var data = [available, backendName];

        db.run(sql, data, function(err){
            if(err) {
                return console.error(err.message);
            }
        });
    },
    getServer : function(server, callback){
        servers = [];

        db.all("SELECT * FROM servers", function(err, rows){
            for(var i = 0; i < rows.length; i++){
                servers.push({"name" : rows[i].frontendName, "available" : rows[i].available, "provider" : rows[i].provider});
            }

            callback(servers);
        });
    },
};

module.exports = methods;