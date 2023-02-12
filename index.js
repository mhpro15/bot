require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
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
        message.reply(response.data.choices[0].text);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.DISCORD_KEY);
