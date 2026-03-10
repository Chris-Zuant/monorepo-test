import { DBConnectionManager } from "./mongoDbConnectionManager";

export const getCollection = async (databaseName: any, collectionName: any) => {

  const dbConnection = await DBConnectionManager.acquireDBReference(databaseName);
  return dbConnection.collection(collectionName);

}