const Discord = require("discord.js");
const cpu = require("cpu-stat");
const ms = require("ms");
const moment = require("moment");
const { stripIndent } = require("common-tags")
const { convertBytes } = require("../main.js");

exports.run = (client, message, args) => {

    cpu.usagePercent((error, percents, seconds) => {

        let bs = stripIndent(`
        Uptime: ${ms(client.uptime)}
        Discord.js Version: ${require("../package.json").dependencies["discord.js"] || "n/a"}
        `);

        let ss = stripIndent(`
        Memory Usage: ${convertBytes(process.memoryUsage().heapUsed)} 
        CPU Usage: ${percents.toFixed(2)} %
        `);

        const embed = new Discord.MessageEmbed()
      .setAuthor("GTPS Auto Backup Discord Bot")
      .setColor("RANDOM")
      .addField("Bot Stats: ", "```" + bs + "```", true)
      .addField("System Stats: ", "```" + ss + "```", true)
      .setTimestamp();
        
      return message.channel.send(embed);

    })

}
