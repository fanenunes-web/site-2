import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateVideoSummary = async (videoTitle: string, channelName: string): Promise<string> => {
  if (!apiKey) {
    return "Resumo simulado (Configure a API Key para gerar com IA Real): Este vídeo aborda temas fundamentais sobre o assunto, trazendo insights profundos dos apresentadores.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Atue como um estrategista de conteúdo sênior da PO Labs. Escreva um "Resumo Executivo" curto, impactante e sofisticado (máximo 25 palavras) para um vídeo de podcast com o título: "${videoTitle}" do canal "${channelName}". O tom deve ser profissional e intrigante using a metodologia "Vibe Coding".`,
    });
    
    return response.text || "Resumo indisponível no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Não foi possível gerar o resumo via IA no momento.";
  }
};