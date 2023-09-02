const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
module.exports = {
    name: "showxp",

    async run (client, message, args){
        const defaut_prefix = "q";
        let user = args[0]
        if (user == null)
        {
          return message.reply(`Command = ${config.prefix}showxp [Player]`)
        }

        fs.access(config.player + `\\_${args[0]}.json`, fs.F_OK, (err) => {
          if (err) {
            return  message.reply("Player not found!")
          }

        let playername1 = config.player + `\\_${args[0]}.json`
        let playername2 = require(playername1);

        var contents = fs.readFileSync(playername1);
          var jsonContent = JSON.parse(contents);
          var sxp = parseInt(jsonContent.xp)
          return message.reply(`${user} has ${sxp} XP!`)
        })
       }
    }

