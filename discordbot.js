const Discord = require('discord.js');
const checker = require('./index');
const client = new Discord.Client();


var channel;
var date = new Date();

function addZero(time){    
    if(time < 10){
        return ("0" + time);
    } else{
        return time;
    }
}

client.on('ready', () => {
    console.log('Ready!');
    channel = client.channels.get("489444708029038595")

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

client.on('message', msg => {
    if(msg.content === '1801sys45'){
        msg.reply(checker.getName(msg.content));
    }
})

client.login('NDg5NDQzOTM4NDY2NTI5Mjgx.Dnq12A.vpiijy0Nr2EY8Xn0cM4bxJE7nHw');