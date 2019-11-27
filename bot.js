const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const userIDs = require('./userIDs.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();
bot.once('ready', () => {
    logger.info('ready!');
})
bot.login(auth.token);

// Bot Settings
let loveDanielMode = true;

bot.on('message', message => {
    const userID = message.author.id;
    const channelID = message.channel.id;
    const prefix = 'ily'

    if (userID === userIDs.bot) return;
    if (userID === userIDs.daniel && loveDanielMode) {
        const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '💘', '♋', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣'];
        hearts.forEach(emoji => message.react(emoji));
    }
    if (message.content.substring(0, prefix.length) == prefix) {
        const args = message.content.substring(prefix.length + 1).split(' ');
        const cmd = args[0];
        switch (cmd) {
            case 'daniel':
                message.channel.send('ily <3');
                break;
            case 'mike':
            case 'michael':
                message.channel.send('ily a little bit');
                break;
            case 'shili':
            case 'shiliang':
                message.channel.send('lolicon');
                break;
            case 'repo':
                message.channel.send('https://github.com/wlee221/daniel-bot')
                break;
            case 'help':
                message.channel.send('Current commands: `whowouldwin`, daniel`, `mike`, `michael`, `shili`, `shiliang`, `repo`, `help`, `danielLoveMode`, `code`\nformat: `ily [command]`');
                break;
            case 'code':
                message.channel.send('https://github.com/wlee221/daniel-bot/blob/master/bot.js');
                break;
            case 'danielLoveMode':
                if (loveDanielMode) {
                    message.channel.send('turned off the daniel love mode.')
                } else {
                    message.channel.send('turned on the daniel love mode.')
                }
                loveDanielMode = !loveDanielMode;
                break;
            case 'whowouldwin':
                const mentionedUsers = message.mentions.users;
                const userIDs = mentionedUsers.map(user => user.id);
                if (userIDs.length === 0) {
                    message.channel.send('Usage: `ily whowouldwin [person 1] [person 2] ...`');
                    return;
                }
                const chosenID = userIDs[Math.floor(Math.random() * userIDs.length)];
                message.channel.send(`<@${chosenID}> wins!`);
                break;
            case 'choose':
                const options = args.slice(1);
                if (options.length === 0) {
                    message.channel.send('Usage: `ily choose [object 1] [object 2] ...`');
                    return;
                }
                const chosenOption = options[Math.floor(Math.random() * options.length)];
                message.channel.send(`DanielBot chooses \`${chosenOption}\`!`);
                break;
            case 'weed':
                const eLength = Math.floor((5 + Math.random() * 20));
                const weed = 'w';
                while (eLength--) weed += 'e';
                weed += 'd';
                message.channel.send(`${weed}`);
                break;
            default:
                message.channel.send('Unknown command. Type \`ily help`\ to see a list of commands.')
                break;
        }
    }
});