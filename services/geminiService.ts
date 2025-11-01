import { GoogleGenAI, Type } from "@google/genai";
import { DailyContent } from '../types';

class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateDailyContent(usedWords: string[], usedIdioms: string[]): Promise<Omit<DailyContent, 'date'>> {
    const model = 'gemini-2.5-flash';

    const schema = {
      type: Type.OBJECT,
      properties: {
        word: { type: Type.STRING, description: "A single, interesting English word." },
        wordPronunciation: { type: Type.STRING, description: "The pronunciation of the word, written in a simple 'sounds like' format (e.g., 'uh·feh·muh·ruhl')." },
        wordMeaning: { type: Type.STRING, description: "The definition of the word." },
        wordExamples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 example sentences using the word." },
        idiom: { type: Type.STRING, description: "A common English idiom." },
        idiomMeaning: { type: Type.STRING, description: "The meaning of the idiom." },
        idiomExamples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 example sentences using the idiom." }
      },
      required: ["word", "wordPronunciation", "wordMeaning", "wordExamples", "idiom", "idiomMeaning", "idiomExamples"]
    };

    const prompt = `
      Generate a new "Word of the Day" and "Idiom of the Day".
      For the word, provide its pronunciation in a simple "sounds like" format (e.g., uh·feh·muh·ruhl).
      They MUST NOT be from the following lists.
      Used Words: ${usedWords.join(', ') || 'None'}
      Used Idioms: ${usedIdioms.join(', ') || 'None'}
      Provide a clear meaning and 2-3 concise example sentences for each.
      The word should be interesting but not overly obscure. The idiom should be commonly understood.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.8,
        },
      });

      const jsonText = response.text.trim();
      const data = JSON.parse(jsonText);
      
      // Basic validation
      if (!data.word || !data.wordPronunciation || !data.idiom || !data.wordExamples || data.wordExamples.length === 0) {
        throw new Error("Received incomplete data from API.");
      }

      return data as Omit<DailyContent, 'date'>;

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to generate content from Gemini API. Please check your API key and network connection.");
    }
  }
}

export const geminiService = new GeminiService();