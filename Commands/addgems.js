const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
module.exports = {
    name: "addgems",

    async run (client, message, args){
      const defaut_prefix = "q";
      if(!message.member.roles.cache.some(r=>[config.cmdperm].includes(r.name)) ) return message.reply(`You can't use this command`);    
        const user = args[0]
        const gems = args[1]

        if (args[0] == null)
        {
        return message.reply(`Usage: ${defaut_prefix}addgems [Player] [Gems Amount]`)
        }

        if (args[1] == null)
        {
        return message.reply(`Usage: ${defaut_prefix}addgems [Player] [Gems Amount]`)
        }

        if (fs.existsSync(config.gemconf + `\\_${args[0]}.txt`)) {

          if (!fs.existsSync(config.gemconf + `\\_${args[0]}.txt`)) {
            return message.reply("Player not found!")
          }

          let gemdb2 = config.gemconf + `\\_${args[0]}.txt`

          var contents1 = fs.readFileSync(gemdb2);
          var newgem3 = parseInt(contents1)
          var gemargs2 = parseInt(gems)
          newgem3 += gemargs2
          const gemssdb =  parseInt(newgem3)
          fs.writeFile(gemdb2, gemssdb.toString(), function() {
            const rgemdb = fs.readFileSync(gemdb2)
            return message.reply(`✅Gems added!\nPlayer: ${args[0]}\nGems Amount Added :gem: : ${args[1]}\nTotal Gems: ${rgemdb}`)
          })
          return
        }

        if (!fs.existsSync(config.player)) {
          return message.reply("Player folder not found, ensure that the bot has been configured correctly.")
        }

        fs.access(config.player + `\\_${args[0]}.json`, fs.F_OK, (err) => {
          if (err) {
            return  message.reply("Player not found.")
          }

        let playername1 = config.player + `\\_${args[0]}.json`
        let playername2 = require(playername1);
        
          var contents = fs.readFileSync(playername1);
          var jsonContent = JSON.parse(contents);
          var newgem2 = parseInt(jsonContent.gems)
          var gemargs = parseInt(gems)
          newgem2 += gemargs
     const gemss =  parseInt(newgem2)

      playername2.gems = gemss;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
          return message.reply(`Gems added!\n\ntPlayer: ${args[0]}\nGems Amount Added: ${args[1]}\nTotal Gems Amount: ${playername2.gems}`)
        })
      })
    }
}