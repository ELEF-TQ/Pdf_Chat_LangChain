import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";
import { delay } from "./utils";

let pineconeClientInstance: Pinecone | null = null;

// Create Pinecone index if it doesn't exist
async function createIndex(client: Pinecone, indexName: string) {
  try {
    await client.createIndex({
      name: indexName,
      dimension: 1536,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });
    
    await delay(240000 * 1000); // Adjust delay to milliseconds
    console.log("Index created!");
  } catch (error) {
    console.error("Error creating index:", error);
    throw new Error("Index creation failed");
  }
}

// Initialize Pinecone client and ensure the index is ready to be accessed
async function initPineconeClient() {
  try {
    const pineconeClient = new Pinecone({
      apiKey: env.PINECONE_API_KEY,
    });
    
    const indexName = env.PINECONE_INDEX_NAME;

    const indexList = await pineconeClient.listIndexes();
    const existingIndexes = indexList.indexes ? indexList.indexes.map(index => index.name) : [];

    if (!existingIndexes.includes(indexName)) {
      await createIndex(pineconeClient, indexName);
    } else {
      console.log("Your index already exists.");
    }

    return pineconeClient;
  } catch (error) {
    console.error("Error initializing Pinecone Client:", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}
