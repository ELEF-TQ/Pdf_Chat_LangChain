import { env } from './config';
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from "@langchain/pinecone";


export async function embedAndStoreDocs(
  client: Pinecone,
  docs: Document[] | any
) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.index(env.PINECONE_INDEX_NAME);

    // Embed the documents and store them in the vector store
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: 'text',
    });

    console.log('Documents embedded and stored successfully.');
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to load your docs!');
  }
}

// Returns vector-store handle to be used as retrievers in LangChain
export async function getVectorStore(client: Pinecone) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.index(env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: 'text',
    });

    return vectorStore;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Something went wrong while getting vector store!');
  }
}
