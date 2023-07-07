const cds = require("@sap/cds");
const fs = require("fs");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

module.exports = function () {
  
  const openaiInstruction = fs.readFileSync(path.join( __dirname ,"./openai-instructions.txt"))
  const configuration = new Configuration({
    apiKey: cds.env.openaikey,
  });
  const openai = new OpenAIApi(configuration);

  this.before("CREATE", "Tickets", async (req) => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `${req.data.text}${openaiInstruction}` },
        ],
      });
      const openaiTicketData = JSON.parse(completion.data.choices[0].message.content)
      req.data.summary = openaiTicketData.summary
      req.data.responseSuggestion = openaiTicketData.response
      if(openaiTicketData.orderNumber) {
        req.data.order = await SELECT.one.columns(['ID']).from('de.quadrio.recap.Orders').where `humanId = ${openaiTicketData.orderNumber}`
      }
    } catch (error) {
      console.log("Could not extract ticket data", error)
    }
    
  });
};
