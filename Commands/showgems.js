const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
module.exports = {
    name: "showgems",

    async run (client, message, args){
        const defaut_prefix = "q";
        let user = args[0]
        if (user == null)
        {
          return message.reply(`Command = ${defaut_prefix}showgem [Player]`)
        }

        if (fs.existsSync(config.gemconf + `\\_${args[0]}.txt`))
        {
          if (!fs.existsSync(config.gemconf + `\\_${args[0]}.txt`)) {
            return message.reply("Player not found!")
          }

          let gemdb1 = config.gemconf + `\\_${args[0]}.txt`

          if (!fs.existsSync(gemdb1)) {
            return message.reply("Player not found!")
          }

          var sgem = fs.readFileSync(gemdb1);

          return message.reply(`${user} Have ${sgem} Gems!`)
        }
        
        if (!fs.existsSync(config.player)) {
          return message.reply("Player folder not found, ensure that the bot has been configured correctly.")
        }

        fs.access(config.player + `\\_${args[0]}.json`, fs.F_OK, (err) => {
          if (err) {
            return  message.reply("Player Not Found!")
          }

        let playername1 = config.player + `\\_${args[0]}.json`
        let playername2 = require(playername1);

        var contents = fs.readFileSync(playername1);
          var jsonContent = JSON.parse(contents);
          var sgem = parseInt(jsonContent.gems)
          return message.reply(`${user} Have ${sgem} Gems!`)
        })
       }
    }

