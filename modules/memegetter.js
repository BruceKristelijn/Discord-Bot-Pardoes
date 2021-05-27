const Discord = require('discord.js');
const memechannel = "664491554551103498";

class MemeGetter {
    SetupBot(bot) {
        bot.AddEventListener("meme", function (msg) {
            bot.channels.fetch(memechannel).then(function (channel) {
                channel.messages.fetch({ limit: 100 }).then(msgs => {
                    console.log(msgs.size);
                    var randomID = Math.floor(Math.random() * msgs.size);
                    var i = 0;
                    msgs.forEach(qmsg => {
                        if (i == randomID) {
                            //qmsg.attachments.Collection.foreach(e => console.log(e.url));
                            msg.reply(qmsg.attachments.array()[0].url);
                            msg.delete();
                        }
                        i++;
                    })
                });
            });
        });
    }
}

module.exports = MemeGetter