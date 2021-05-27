const Discord = require('discord.js');
const channelid = "681877484878430237";

class QuoteGetter {
    SetupBot(bot) {
        bot.AddEventListener("quote", function (msg) {
            bot.channels.fetch(channelid).then(function (channel) {
                channel.messages.fetch({ limit: 100 }).then(msgs => {
                    console.log(msgs.size);
                    var randomID = Math.floor(Math.random() * msgs.size);
                    var i = 0;
                    msgs.forEach(qmsg => {
                        if (i == randomID) {
                            //qmsg.attachments.Collection.foreach(e => console.log(e.url));
                            msg.reply(qmsg.messages);
                            msg.delete();
                        }
                        i++;
                    })
                });
            });
        });
    }
}

module.exports = QuoteGetter