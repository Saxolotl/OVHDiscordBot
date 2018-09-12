const Discord = require('discord.js');
const schedule = require('node-schedule');

const checker = require('./checker');
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
    var date = new Date();

    checker.updateServers(function(servers){
        var msg = '```';

        for(var i = 0; i < servers.length; i++){
            msg += servers[i] + "\n";
        }

        msg += '```';
        console.log(msg.length);

        channel.send("**Server status as of: **" + addZero(date.getHours()) + ":" + addZero(date.getMinutes()));
        channel.send(msg);
    });
});

client.on('ready', () => {
    channel = client.channels.get(config.channelID);
});

client.on('message', msg => {
    if(msg.content === '1801sys45'){
        msg.reply(checker.getName(msg.content));
    }
})

client.login(config.discordToken);