import "dotenv/config";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { vectorStore } from "../services/vector.service.js";

async function indexDocument() {
  try {
    console.log("Loading PDF...");

    const loader = new PDFLoader("./documents/cg-internal-docs.pdf");

    const docs = await loader.load();

    console.log(`Loaded ${docs.length} pages`);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });

    console.log("Chunking documents...");

    const chunks = await splitter.splitDocuments(docs);

    console.log(`Created ${chunks.length} chunks`);

    console.log("Generating embeddings and uploading...");

    await vectorStore.addDocuments(chunks);

    console.log("Document indexed successfully");
  } catch (error) {
    console.error("Indexing failed:", error);
  }
}

indexDocument();
