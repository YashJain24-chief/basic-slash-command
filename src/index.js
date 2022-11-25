// basically client is a starting point of any bot
import { Client } from "discord.js";
import { config } from "dotenv";
config();

// we pass in intents because we want to receive events related to guillds and guild messages
const client = new Client({ intents: ["Guilds", "GuildMessages"] });

// Log in to Discord with your client's token and get your bot online!
client.login(process.env.DISCORD_TOKEN);
