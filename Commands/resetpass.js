const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
module.exports = {
    name: "resetpass",


    async run (client, message, args){
      const defaut_prefix = "q";
      const user = args[0]
      const pass = args[1]
      if(!message.member.roles.cache.some(r=>[config.cmdperm].includes(r.name)) ) return message.reply(`You can't use this command`);    
      if(args[0] == null)
        return message.reply(`Usage: ${defaut_prefix}forgotpass <playername> <new password>`);

        if(args[1] == null)
        return message.reply(`Usage: ${defaut_prefix}forgotpass <playername> <new password>`);

        if (!fs.existsSync(config.player)) {
        return message.reply("Player folder not found, ensure that the bot has been configured correctly.")
      }

      if (!fs.existsSync(config.player + "\\" + "_" + user + ".json")) {
      return  message.reply("Player not found!")
    }
      let playername1 = config.player + `\\_${args[0]}.json`
      let playername2 = require(playername1);
          playername2.password = pass;
          fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
          if (err)
            return console.log(err);
          message.reply(`✅Successfully Changed password for : ${args[0]}`);
      })
    }
  }