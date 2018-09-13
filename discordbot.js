const Discord = require('discord.js');
const schedule = require('node-schedule');

const checker = require('./checker');
const db = require('./dbhandler');
const config = require('./config.json');

const client = new Discord.Client();


var channel;

//TODO: move to different file
function addZero(time){    
    if(time < 10){
        return ("0" + time);
    } else{
        return time;
    }
}

var job = schedule.scheduleJob('*/' + config.updateInterval + ' * * * *', function(){
    checker.updateServers(function(){
        console.log("hewwo???");
        generateEmbed();
    })


});

client.on('ready', () => {
    channel = client.channels.get(config.channelID);
    checker.updateServers(function(){
        console.log("hello?");
        generateEmbed();
    });
});

client.on('message', msg => {
    if(msg.content === 'server'){
        generateEmbed(msg.content);
    }
})

client.login(config.discordToken);

function generateEmbed(){
    db.getServer(function(server){
        var kim = "";
        var sys = "";
        var ovh = "";

        var date = new Date();

        for(var i = 0; i < server.length; i++){
            var msgFormat = server[i].name + " "+ (server[i].available == 0 ? "unavailable" : "**available**") + "\n";

            if(server[i].provider == "kimsufi"){
                kim += msgFormat;
            } else if(server[i].provider == "soyoustart"){
                sys += msgFormat;
            } else if(server[i].provider == "ovh"){
                ovh += msgFormat;
            }
        }

        var embed = new Discord.RichEmbed()
            .setColor('#A020F0')
            .setTitle('Current Availability of most OVH Servers visible through API, This was retrieved at ' + addZero(date.getHours()) + ":" + addZero(date.getMinutes()))
            .setAuthor('OVH Availability', 'https://partners.ovh.com/assets/images/logo-ovh-contour.png')
            .addField('Kimsufi Servers', kim + '', true)
            .addField('SoYouStart Servers', sys + '', true)
            .addField('OVH Servers', ovh + '', true)
            .setTimestamp()

        channel.send(embed);
    });


    
}