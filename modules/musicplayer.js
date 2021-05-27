const Discord = require('discord.js');
const music = require('../data/music/music.json');
const ytdl = require('ytdl-core');

var dispatcher = null;

class MusicPlayer {
    SetupBot(bot) {
        this.SetupSongCommands(bot);
        this.SetupStopCommand(bot);
    }

    SetupStopCommand(bot) {
        bot.AddEventListener("stop", function (msg) {
            {
                if (dispatcher != null) {
                    msg.reply("OK! :(");
                    msg.delete();

                    dispatcher.end();
                } else {
                    msg.reply("Niks om te stoppen.");
                    msg.delete();
                }
            }
        });
    }

    SetupSongCommands(bot) {
        for (let i = 0; i < music.length; i++) {
            let song = music[i];
            bot.AddEventListener(song.command, function (msg) {
                console.log("play");

                if (msg.member.voice.channel == null) {
                    console.log(msg.author);
                    return;
                }

                var voiceChannel = msg.member.voice.channel;
                voiceChannel.join().then(function (connection) {
                    if (dispatcher != null) { dispatcher.end(); }
                    if (song.message) { msg.reply(song.message); }

                    console.log(song.location);

                    //dispatcher = connection.play("" + song.location, { volume: 1 });

                    dispatcher = connection.play(ytdl(song.location, { quality: 'highestaudio', volume: .25 }));

                    if (song.reply != null) {
                        msg.reply(song.reply);
                    }
                    msg.delete();

                }).catch(err => console.log("Err:" + err));
            })
        }
    }
}

module.exports = MusicPlayer