require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
  organization: process.env.CHATGPT_ORGANIZATION,
});

const openai = new OpenAIApi(config);

const colmeiIa = async (response) => {
  const prompt = `Analisar se o texto a seguir tende mais para SIM ou NÃO, se SIM retornar somente CONFIRMAR, se NÃO retornar somente REVER AGENDAMENTO caso o sentimento seja neutro retorna NÃO ENTENDI O QUE VOCÊ FALOU: ${response}`;

  try {
    const completions = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 2048,
    });

    return completions.data.choices[0].text.trim();
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  const response = "Pedrão da pedreira pronto para atendelo...";
  const responseBot = await colmeiIa(response);
  console.log("Resposta:", responseBot);
})();
