// basically client is a starting point of any bot
import { Client, Routes } from "discord.js";

// Rest is used for interacting with discord API's without much hassle
import { REST } from "@discordjs/rest";

import { config } from "dotenv";
config();

import open from "open";

const BOT_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.APP_ID;

//creating a rest instance to start interacting with Discord API's
const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

// we pass in intents because we want to receive events related to guillds and guild messages
const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
});

//on basically listens to an event, Basically ready event is triggered whenever bot comes online

client.on("ready", () => {
  console.log("Bot is online!");
});

// messageCreate event is basically triggered whenever any message is sent on the server by someone
//Enable MESSAGE CONTENT INTENT for your bot in developer portal
client.on("messageCreate", (message) => {
  console.log(
    "onMessageCreate",
    message.content,
    message.client.user.id,
    message.author.tag
  );
});

//whenever we use a slash command, it triggers an interaction event and we have to listen to those interactions
client.on("interactionCreate", async (interaction) => {
  if (interaction.commandName === "hey" && interaction.isChatInputCommand) {
    await interaction.reply("Hello world");
    console.log("interaction", interaction.user);
  }
  if (interaction.commandName === "verify" && interaction.isChatInputCommand) {
    await interaction.reply("Opening a browser for your identity verification");
    await open("https://www.google.com/");
  }
});

client.on("guildMemberAdd", (member) => {
  member.roles.add("1045721239014092881");
  // member.guild.channels.cache.get("707323130523418686").send(`Hi ${member.user} blabla`);
  console.log(member.user.id + " is in da house");
});

const commands = [
  {
    name: "hey",
    description: "Replies with Hello World!",
  },
  {
    name: "verify",
    description: "Opens a browser for verification",
  },
];

async function main() {
  try {
    console.log("Started refreshing application (/) commands.");

    //registering/updating all our guild commands, recommended approach is to used global commands
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    const data = await rest.get(Routes.invite("caVHFA9"));
    console.log("my invite", data);

    console.log("Successfully reloaded application (/) commands.");

    // Log in to Discord with your client's token and get your bot online!
    client.login(BOT_TOKEN);
  } catch (error) {
    console.error(error);
  }
}

main();
