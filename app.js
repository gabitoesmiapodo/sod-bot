const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// List of common Spanish words to detect
const spanishWords = [
  "ahora",
  "alguno",
  "así",
  "año",
  "bien",
  "birra",
  "bondi",
  "cada",
  "che",
  "como",
  "con",
  "copado",
  "cosa",
  "creer",
  "cuando",
  "dar",
  "deber",
  "decir",
  "dejar",
  "desde",
  "después",
  "donde",
  "día",
  "encontrar",
  "entonces",
  "entre",
  "ese",
  "estar",
  "este",
  "grande",
  "guita",
  "hablar",
  "hacer",
  "hasta",
  "hola",
  "hombre",
  "laburar",
  "las",
  "llegar",
  "llevar",
  "los",
  "mango",
  "mate",
  "menos",
  "mismo",
  "mucho",
  "muy",
  "más",
  "nada",
  "ni",
  "nos",
  "nuestro",
  "nuevo",
  "otro",
  "para",
  "parecer",
  "parte",
  "pasar",
  "pero",
  "pibe",
  "piola",
  "poco",
  "poder",
  "poner",
  "porque",
  "posta",
  "primero",
  "que",
  "qué",
  "quedar",
  "querer",
  "quilombo",
  "saber",
  "seguir",
  "si",
  "sí",
  "siempre",
  "sin",
  "sobre",
  "también",
  "tan",
  "tanto",
  "tener",
  "tiempo",
  "todo",
  "uno",
  "ver",
  "vez",
  "vida",
];

app.message(
  new RegExp(spanishWords.join("|"), "i"),
  async ({ message, say }) => {
    await say({
      text: `Hi, my name is <https://www.youtube.com/watch?v=Cuz3t3eUqVs|Sargent D> and I'm here to gently remind you that this is an English only channel.`,
      unfurl_links: false,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚫 Spanish Detected 🚫",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "_Hi, my name is <https://www.youtube.com/watch?v=Cuz3t3eUqVs|Sargent D> and I'm here to gently remind you that this is an *English only* channel._",
          },
        },
        {
          type: "divider",
        },
      ],
    });
  }
);

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bot is running!");
})();
