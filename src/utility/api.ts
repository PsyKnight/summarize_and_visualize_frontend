import { InferenceClient } from "@huggingface/inference";

const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
// const summaryUrl = "http://localhost:5500/generate-summary";
// const imageUrl = "http://localhost:5000/generate-image";
const client = new InferenceClient(apiKey);

export const getSummary = async (text: string, extractedText: string) => {
  try {
    const prompt = `Summarize the following text in a concise paragraph, highlighting the main points and key details. Do NOT write anything other than the summary. Write the summary in markdown format. If there is nothing to summarize then just write "Please upload the file again". Here is the text:

${text}

${extractedText}`;

    const chatCompletion = await client.chatCompletion({
      provider: "sambanova",
      model: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (!chatCompletion) console.error("Failed to fetch summary");

    const response = chatCompletion.choices[0].message;

    console.log(response);

    return response.content;
  } catch (error) {
    console.error(error);
  }
};

export const getImage = async (summary: string) => {
  try {
    return await client.textToImage({
      provider: "replicate",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: summary,
    });
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
};
