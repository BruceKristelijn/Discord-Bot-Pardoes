require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = require('./token.json').token;
const streamOptions = { seek: 0, volume: 1 };

var dispatcher = null;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Piraña Summer Remix", { type: "LISTENING"})
});

bot.on('message', msg => {
  msg.content.toLocaleLowerCase();

  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');
  }

  if (msg.content === 'Alle,') {
    msg.reply(' Tovertwinkels!');
  }

  if (msg.content === 'pardoes pirana') {
    if(msg.member.voiceChannel == null)
    return;

    var voiceChannel = msg.member.voiceChannel;
    voiceChannel.join().then(connection =>{
      if(dispatcher != null){ dispatcher.end(); }

      dispatcher = connection.playFile('./music/pirana.mp3');

      dispatcher.on("end", end => {msg.reply('No more piraña time!'); voiceChannel.leave();});

      msg.reply('Piraña time!');
    }).catch(err => console.log(err));
  }

  if (msg.content === 'pardoes illumina') {
    if(msg.member.voiceChannel == null)
      return;

    var voiceChannel = msg.member.voiceChannel;
    voiceChannel.join().then(connection =>{
      if(dispatcher != null){ dispatcher.end(); }

      dispatcher = connection.playFile('./music/fantasia.wav');

      dispatcher.on("end", end => {voiceChannel.leave();});
    }).catch(err => console.log(err));
  }

  if (msg.content === 'pardoes alle') {
    if(msg.member.voiceChannel == null)
      return;

    var voiceChannel = msg.member.voiceChannel;
    voiceChannel.join().then(connection =>{
      if(dispatcher != null){ dispatcher.end(); }

      dispatcher = connection.playFile('./music/tovertwin.wav');

      dispatcher.on("end", end => {voiceChannel.leave();});
    }).catch(err => console.log(err));
  }

  if (msg.content === 'pardoes stop') {
    if(dispatcher != null){
      msg.reply('OK :(');
      dispatcher.end();
    }
  }

  if (msg.content === 'pardoes quote') {
    var channel = bot.channels.get("681877484878430237");
    channel.fetchMessages().then(msgs => {
      var randomID = Math.floor(Math.random() * msgs.size);
      var i = 0;
      msgs.forEach(qmsg => {
        if(i == randomID){
           msg.reply(qmsg.content);
           msg.delete();
        }
        i++;
      })
    });
  }

  if (msg.content === 'pardoes meme') {
    var channel = bot.channels.get("664491554551103498");
    channel.fetchMessages().then(msgs => {
      console.log(msgs.size);
      var randomID = Math.floor(Math.random() * msgs.size);
      var i = 0;
      msgs.forEach(qmsg => {
        if(i == randomID){
          //qmsg.attachments.Collection.foreach(e => console.log(e.url));
           msg.reply(qmsg.attachments.array()[0].url);
           msg.delete();
        }
        i++;
      })
    });
  }

});