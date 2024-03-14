const { App } = require("@slack/bolt");

// Define the handler outside of the exports.handler to avoid reinitializing it on every function invocation
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
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
  "cual",
  "cuando",
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
  "en",
  "encontrar",
  "entonces",
  "entre",
  "es",
  "ese",
  "esta",
  "estar",
  "este",
  "esto",
  "grande",
  "guita",
  "hablar",
  "hacer",
  "hasta",
  "hola",
  "hombre",
  "la",
  "laburar",
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
  "quedar",
  "querer",
  "quilombo",
  "qué",
  "saber",
  "seguir",
  "si",
  "siempre",
  "sin",
  "sobre",
  "sí",
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

// Pre-compile the RegExp for performance
const spanishRegExp = new RegExp(`\\b(${spanishWords.join("|")})\\b`, "i");

exports.handler = async (event, context) => {
  // Parse the incoming HTTP event
  const slackEvent = JSON.parse(event.body);

  // Handle URL verification challenge
  if (slackEvent.type === "url_verification") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challenge: slackEvent.challenge }),
    };
  }

  try {
    // Initialize response object
    let response = {};

    // Check for message events and process them
    if (
      (slackEvent.event && slackEvent.event.type === "app_mention") ||
      slackEvent.event.type === "message"
    ) {
      const message = slackEvent.event.text;

      // Check if the message contains any of the Spanish words
      if (spanishRegExp.test(message)) {
        // Using WebClient to post a message directly since we can't use the receiver's middleware
        await app.client.chat.postEphemeral({
          token: process.env.SLACK_BOT_TOKEN,
          channel: slackEvent.event.channel,
          user: slackEvent.event.user, // Only the user who sent the message will see this
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
      }
    }

    // Respond to Slack that the event was processed successfully
    return {
      statusCode: 200,
      body: "",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Something went wrong",
    };
  }
};
