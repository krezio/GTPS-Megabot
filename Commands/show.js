const Discord = require("discord.js");
const config = require("../config.json");
const moment = require("moment");
const { stripIndent } = require("common-tags");
const data = require("../Data/data.json");
const { getAllFiles, getTotalSize } = require("../main.js")

exports.run = (client, message, args) => {
    let get_data = data.time;
    get_data = get_data ? `${moment.utc(data.time).format("lll")} (UTC Time)` : "None";
    let dsc = stripIndent(`
    No. of worlds: ${getAllFiles(config.gtps_folder + config.world_folder).length}
    No. of players: ${getAllFiles(config.gtps_folder + config.player_folder).length}
    `)

    const embed = new Discord.MessageEmbed()
    .setAuthor("Server stats")
    .setColor("RANDOM")
    .addField("Stats:", "```" + dsc + "```", true)
    .setFooter("Last Backup: " + get_data)

    return message.channel.send(embed);
}
