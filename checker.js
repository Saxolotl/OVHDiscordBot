const request = require('request');
const kimsufi = require('./servers/kimsufi.json');
const soyoustart = require('./servers/soyoustart.json');

var servers = [];

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
    getName: function(backendName) {
        for(var i = 0; i < kimsufi.length; i++){
            if(backendName == kimsufi[i].backendName){
                return kimsufi[i].displayName;
            }
        }

        // for(var i = 0; i < soyoustart.length; i++){
        //     if(backendName == soyoustart[i].backendName){
        //         return soyoustart[i].displayName;
        //     }
        // }

        return backendName;
    },
    //use callback to pass servers to discordbot.js
    updateServers: function(callback) {

        request('https://www.ovh.com/engine/api/dedicated/server/availabilities?country=uk', function(error, response, body){
            body = JSON.parse(body);
            var serverTemp = [];

            for(var i = 0; i < body.length; i++){
                if(!body[i].hardware.includes("discount") && methods.getName(body[i].hardware) != body[i].hardware){

                    var dcList = body[i].datacenters;
                    var dcDebug = "";
                    for(var j = 0; j < dcList.length; j++){

                        if(dcList[j].availability != "unavailable"){
                            dcDebug += regions[dcList[j].datacenter] + " in " + dcList[j].availability + " ";
                        }
                    }
                    if(dcDebug != ""){
                        serverTemp.push("Server: " + methods.getName(body[i].hardware) + " (" + body[i].region + ") " + " available: " + dcDebug);
                    }
                }
            }

            callback(serverTemp);

        });
    }
}

module.exports = methods;

