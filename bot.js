Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '-') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'daniel':
                bot.sendMessage({
                    to: channelID,
                    message: 'ily'
                });
                break;
            case 'repo':
                bot.sendMessage({
                    to: channelID,
                    message: 'https://github.com/wlee221/daniel-bot'
                }); 
                break;
            case 'status':
                bot.sendMessage({
                    to: channelID,
                    message: 'This bot currently runs on William\'s local machine and will be offline most of times. It will be hosted on Amazon EC2 after basic functionality has been developed.'
                })
            default:               
                bot.sendMessage({
                    to: channelID,
                    message: 'Unknown command'
                });
                break;
            // Just add any case commands if you want to..
         }
     }
});