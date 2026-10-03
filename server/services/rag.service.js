import Groq from "groq-sdk";
import { vectorStore } from "./vector.service.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateRAGResponse(question) {
  // ==========================================
  // STEP 1: RETRIEVAL
  // ==========================================

  const relevantChunks = await vectorStore.similaritySearch(question, 3);

  // ==========================================
  // STEP 2: BUILD CONTEXT
  // ==========================================

  const context = relevantChunks.map((chunk) => chunk.pageContent).join("\n\n");

  // ==========================================
  // STEP 3: SYSTEM PROMPT
  // ==========================================

  const SYSTEM_PROMPT = `
You are an AI assistant for a company's internal documents.

Answer the user's question using ONLY the provided context.

Rules:
1. Do not use information outside the provided context.
2. If the answer cannot be found in the context, say:
   "I don't know based on the provided company documents."
3. Do not make up information.
4. Keep answers ### clear and concise ###.
`;

  // ==========================================
  // STEP 4: AUGMENTATION
  // ==========================================

  const USER_PROMPT = `
    Question:
    ${question}

    Context:
    ${context}

    Answer:
    `;

  // ==========================================
  // STEP 5: GENERATION
  // ==========================================

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: USER_PROMPT,
      },
    ],
  });

  const answer =
    response.choices[0]?.message?.content ?? "Unable to generate response.";

  return {
    answer,
    sources: relevantChunks.map((chunk) => ({
      content: chunk.pageContent,
      metadata: chunk.metadata,
    })),
  };
}
