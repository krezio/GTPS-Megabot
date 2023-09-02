const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
module.exports = {
    name: "giverole",

    async run (client, message, args){
        const defaut_prefix = "q";
        const user = args[0]
        const role = args[1]
    if(!message.member.roles.cache.some(r=>[config.cmdperm].includes(r.name)) ) return message.reply(`You can't use this command`);    
      if (user == null)
      {
      return message.reply(`Command = ${defaut_prefix}giverole [Player] [Role Number]`)
      }
      if (role == null)
      {
      return message.reply(`Command = ${defaut_prefix}giverole [Player] [Role Number]`)
      }
      
      if (!fs.existsSync(config.player)) {
        return message.reply("Player folder not found, ensure that the bot has been configured correctly.")
      }

      if (!fs.existsSync(config.player + "\\" + "_" + user + ".json")) {
        return message.reply("Player not found!")
      }
      let playername1 = config.player + `\\_${args[0]}.json`
      let playername2 = require(playername1);

      const rolenum =  parseInt(role)

      playername2.adminLevel = rolenum;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
        if (err)
          return console.log(err);
        return message.reply(`✅Role given!\n\nPlayer: ${args[0]}\nGiven Role Number: ${args[1]}`);
        })
    }
}