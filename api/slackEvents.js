module.exports = (req, res) => {
  const body = JSON.parse(req.body);

  if (body.challenge) {
    console.log("Responding to challenge");
    return res.status(200).json({ challenge: body.challenge });
  } else {
    console.log("Received event");
    console.log(body);
  }

  res.status(200).send("Event received");
};

const { App, ExpressReceiver } = require("@slack/bolt");

// Initialize your custom receiver
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

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

    console.log(message);
  }
);

// Export the receiver's router as the module's default export, for Vercel to serve
module.exports = receiver.app;
