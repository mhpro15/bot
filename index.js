require("dotenv").config();

const keepLive = require("./server");
// const answer = ["Alright, I will just get it done for you now so you can leave me alone.", "Come on, when will you finish?", "Here you are, happy now?", "Just give me alone for 1 sec please? ", "I don't know what you gonna do with these infomation but FBI always monitoring you", "If you are arrested, don't say my name.", "This is not plagiarism, I guess"]
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require("openai");
const mySecret = process.env["DISCORD_KEY"];
const mySecret2 = process.env["OPENAI_KEY"];
const mySecret3 = process.env["OPENAI_ORG"];
const configuration = new Configuration({
  organization: mySecret3,
  apiKey: mySecret2,
});
const openai = new OpenAIApi(configuration);

client.on("messageCreate", async (message) => {
  try {
    m = message.content;
    if (m.slice(0, 4) === ".ask") {
      q = m.slice(4, -1);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${q}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      try {
        var lead = answer[Math.floor(Math.random() * answer.length)];
        message.reply("Rurrrrrrr: " + response.data.choices[0].text);
      } catch (err) {
        console.log(err);
        message.reply("Argh something went wrong, try again later!");
      }
    } else if (m.slice(0, 4) === ".img") {
      q = m.slice(4, -1);
      const response = await openai.createImage({
        prompt: `${q}`,
        n: 1,
        size: "1024x1024",
      });

      try {
        message.reply(response.data.data[0].url);
      } catch (err) {
        console.log(err);
        message.reply("Argh something went wrong, try again later!");
      } finally {
      }
    }
  } catch (err) {
    console.log(err);
    message.reply("Argh something went wrong, try again later!");
  }
});
keepLive();
client.login(mySecret);
