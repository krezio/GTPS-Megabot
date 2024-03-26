# GTPS Megabot

A  megabot for the GTPS game server built with Node.js and Discord.js.

## Features

- Automatically backs up game server files at a configurable interval
- Uploads backups to Discord via embed or HTTP if the file is too large
- Allows for easy control of your GTPS server
- Provides stats on the number of players/worlds in backups
- RESTful HTTP endpoint to download backups

## Setup

1. Clone the repository
2. Run `npm install`
3. Create a `config.json` file (see `config.example.json`)
4. Add the bot to your Discord server
5. Run `node index.js`

## Commands

- `$help` - Displays this help message
- `$stats` - Shows server stats
- `$backup` - Manually triggers a backup

## Config Options

| Parameter        | Description                           |
|------------------|---------------------------------------|
| gtps_folder      | Folder containing game server files    |
| player_folder    | Subfolder for player files             |
| world_folder     | Subfolder for world files              |
| token            | Discord bot token                      |
| prefix           | Command prefix                         |
| delay            | Backup interval                        |
| secret_channel   | Channel ID for backups                 |

## Running the Server

1. Install Node.js if not already
2. Run `node index.js`
3. Access backups

## Support

Join the GTPS Discord for support: [https://discord.gg/6fTtwXKWdY](https://discord.gg/6fTtwXKWdY) / discord.gg/tread

## License

MIT © 2022

Let me know if any part of the documentation needs more explanation!
