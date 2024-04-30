import { OpenAIApi, Configuration } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    // Log the type and value of the input text
    console.log('Input type:', typeof text);
    console.log('Input value:', text);
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text.replace(/\n/g,' '),
    });
    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error){
    console.log('Error calling OpenAI Embeddings API', error);
    throw error;
  }
}