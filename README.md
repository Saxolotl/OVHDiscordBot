# OVHDiscordBot
## What does this bot do?
This bot will check the OVH database every x amount of minutes to check which servers are available and unavailable. Then a message is sent by the bot in a Discord channel detailing each server which is available and unavailable

## How to run
`
node discordbot.js
`

## Config File
```javascript
  {
    //Bot token retrieved from the Discord Developer Portal
    "discordToken" : "<INSERT BOT TOKEN>",
    
    //Channel ID for where you want the Bot to post updates
    "channelID" : "<INSERT CHANNEL ID>",
    
    //Period to check availability (in minutes)
    "updateInterval" : 5
  }
```

