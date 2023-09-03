const discord = require("discord.js");
const client = new discord.Client({
    restRequestTimeout: 120000
});
const http = require("http");
const ms = require("ms")
const data = require("./Data/data.json");
const backup = require("./main.js");
const config = require("./config.json");let fs = require('fs');
const path = require('path');
const config = require('./config.json');
const exec = require('child_process').exec;
const lineReader = require('line-reader');
let randomColor = require('randomcolor');
const request = require('request');
const db = require('quick.db');
const {token, prefix} = require ('./config.json');//config.json (start)
client.config = config;//config.json (end)
const bcrypt = require("bcrypt");
const Enmap = require("enmap");
const { readdirSync,fs } = require('fs');
const { join } = require('path');
client.commands= new Discord.Collection();
client.commands = new Enmap();//commands folder (start)
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const files of commandFiles) {
    const command = require (join(__dirname, "commands", `${files}`));
    client.commands.set(command.name, command);
}//commands folder (end)
backup.check_requirement()

const httpServer = http.createServer(function (req, res) {
    if (req.url === "/"+config.gtpsname+"_Backup.zip?keydw=" + data.key ) {
        const fread = fs.readFileSync("GTPS_Backup.zip", "binary")
        res.writeHead(200, {"Content-Type": "application/zip"});
        res.write(fread, "binary");
        return res.end();
    } else {
        res.writeHead(401, "Auth key needed")
        res.write("Authentication Key Need");
        return res.end();
    }
})

client.on("ready", () => {
    client.user.setActivity(config.gtpsname,` K-bot`, {
        type: "WATCHING"
    });
    backup.info_log(`${client.user.tag} is ready !`);

    if (config.delay) {
        setInterval(() => {
            backup.send_backup({ http: httpServer, client });
        }, ms(config.delay));
    }
})

client.on("message", (message) => {
    if (message.author.bot || 
        message.channel.type == "dm" ||
        !message.content.startsWith(config.prefix)) return;
    
    let args = message.content.slice(config.prefix.length).trim().split(" ");
    let command     = args.shift().toLowerCase();
    if (!command) return;

    if (!fs.existsSync(`./Commands/${command}.js`)) return;
    let commandfile = require(`./Commands/${command}.js`);

    try {
        commandfile.run(client, message, args);
    } catch (error) {
        console.error(error.message);
    }

    
    if(prefix === null) prefix = config.prefix;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
            db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
        }
    }
});
let http_status = "> <a:offline:1122870614127034518> Offline"
setInterval(function(){
      request({url: "http://141.95.111.158/", rejectUnauthorized: false, json: true}, function(err) {
          if(err) {
              if(err == "ECONNTIMEDOUT") {
                http_status = "> <a:offline:1122870614127034518> Offline"
              } else {
                  http_status = "> <a:online:1122870321599492126> Online"
              }
          } else {
              http_status = "> <a:online:1122870321599492126> Online"
          }
      })
    });

client.login(config.token);


http.get({
    host : config.ip,
    port : 80,
    path : "/"
}, function(res) {
    res.on("data", function(chunk) {
        data.ip = chunk;
    });
}).on('error', function(e) {
    data.ip = config.ip;
});
exports.http = httpServer
