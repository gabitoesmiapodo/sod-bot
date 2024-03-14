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
  "de",
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
  "la",
  "las",
  "llegar",
  "llevar",
  "lo",
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
  "una",
  "uno",
  "ver",
  "vez",
  "vida",
];

app.message(
  new RegExp(spanishWords.join("|"), "i"),
  async ({ message, client }) => {
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user, // Only the user who sent the message will see this
      text: `Hi, my name is Sargent D and I'm here to gently remind you that this is an English only channel.`,
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

    // await say({
    //   text: `Hi, my name is Sargent D and I'm here to gently remind you that this is an English only channel.`,
    //   blocks: [
    //     {
    //       type: "header",
    //       text: {
    //         type: "plain_text",
    //         text: "🚫 Spanish Detected 🚫",
    //         emoji: true,
    //       },
    //     },
    //     {
    //       type: "section",
    //       text: {
    //         type: "mrkdwn",
    //         text: "_Hi, my name is <https://www.youtube.com/watch?v=Cuz3t3eUqVs|Sargent D> and I'm here to gently remind you that this is an *English only* channel._",
    //       },
    //     },
    //     {
    //       type: "divider",
    //     },
    //   ],
    // });
  }
);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { challenge } = req.body;

    if (challenge) {
      res.status(200).send({ challenge });
    } else {
      receiver.requestHandler(req, res);
    }
  } else {
    res.status(200).send("This endpoint is for Slack events. Shoo.");
  }
};
