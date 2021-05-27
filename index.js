//Import Discord.js
const Discord = require('discord.js');

//Import all components.
const Settings = require('./modules/settings');
const MusicPlayer = require('./modules/musicplayer');
const MemeGetter = require('./modules/memegetter');
const QuoteGetter = require('./modules/quotegetter');

//Create a new bot and authenticate.
const bot = new Discord.Client();
const TOKEN = require('./token.json').token;

//Prepare stream options for audio.
const streamOptions = { seek: 0, volume: 1 };
var dispatcher = null;

//Login the bot.
bot.login(TOKEN);

//On ready call all components to setup their calls.
bot.on('ready', () => {
  //Setup base info.
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Piraña Summer Remix", { type: "LISTENING" })

  //Setup modules.
  new Settings().SetupBot(bot);
  new MusicPlayer().SetupBot(bot);
  new MemeGetter().SetupBot(bot);
  new QuoteGetter().SetupBot(bot);
});

bot.AddEventListener = function (message, event) {
  //If bot has events delete them
  if (bot.events == null)
    bot.events = [];

  //Set message to lowercase
  message = message.toLocaleLowerCase();

  //Add event to array
  bot.events.push({ message: message, event: event });
}

bot.on('message', msg => {
  msg.content = msg.content.toLocaleLowerCase();

  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');
  }

  if (msg.content === 'alle,') {
    msg.reply(' Tovertwinkels!');
  }

  //Call all events for the bot to the proper components
  if (bot.events != null) {
    bot.events.forEach(function (event) {
      var arr = msg.content.split(" ");

      if (arr[0] == 'pardoes' && event.message == arr[1]) {
        event.event(msg);
      }
    });
  }

  if (msg.content === 'pardoes stop') {
    if (dispatcher != null) {
      msg.reply('OK :(');
      dispatcher.end();
    }
  }
});