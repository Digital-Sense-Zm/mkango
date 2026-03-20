import { createGroq } from '@ai-sdk/groq';
import { createOpenAI } from '@ai-sdk/openai';

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY || '' });
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export const getPrimaryModel = () => {
  const provider = process.env.PRIMARY_LLM_PROVIDER || 'groq';
  const modelName = process.env.PRIMARY_LLM_MODEL || 'llama-3.1-8b-instant';
  
  if (provider === 'groq') {
    return groq(modelName);
  }
  return openai(modelName);
}

export const getSecondaryModel = () => {
  const provider = process.env.SECONDARY_LLM_PROVIDER || 'openai';
  const modelName = process.env.SECONDARY_LLM_MODEL || 'gpt-4o-mini';
  
  if (provider === 'groq') {
    return groq(modelName);
  }
  return openai(modelName);
}
