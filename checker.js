const request = require('request');
const dbhand = require('./dbhandler');

let regions = {
    "waw" : "Warsaw",
    "fra" : "Frankfurt",
    "syd" : "Sydney",
    "lon" : "London",
    "sgp" : "Singapore",
    "gra" : "Gravelines",
    "sbg" : "Strasbourg",
    "bhs" : "Beauharnois",
    "rbx" : "Roubaix",
    "default" : "Default"
}

var methods = {
    //use callback to pass servers to discordbot.js
    updateServers: function(callback) {

        request('https://www.ovh.com/engine/api/dedicated/server/availabilities?country=uk', function(error, response, body){
            body = JSON.parse(body);
            var alreadyUpdated = [];

            for(var i = 0; i < body.length; i++){
                if(!body[i].hardware.includes("discount")){

                    var dcList = body[i].datacenters;
                    var available = 0;
                    for(var j = 0; j < dcList.length; j++){
                        if(dcList[j].availability != "unavailable"){
                            available++;
                        }
                    }
                    
                    var hardware = body[i].hardware.slice(4,10);

                    if(alreadyUpdated.includes(hardware) && available > 0){
                        dbhand.updateRow(hardware, available);
                        alreadyUpdated.push(hardware);
                    } else if(!alreadyUpdated.includes(hardware) && available > 0){
                        dbhand.updateRow(hardware, available);
                        alreadyUpdated.push(hardware);
                    } else if(!alreadyUpdated.includes(hardware) && available == 0){
                        dbhand.updateRow(hardware, available);
                        alreadyUpdated.push(hardware);
                    }
                }
            }

            callback();

        });
    }
}

module.exports = methods;

