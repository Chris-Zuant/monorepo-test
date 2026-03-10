'use strict';

import { MongoClient } from 'mongodb';


const connectionString = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_OPTIONS
const client = new MongoClient(connectionString);

let mongoClientConnection: MongoClient; // This will be used as the only Mongo connection - it will be lazily instantiated

const aquireClient = async () => {
  try {
    await EnsureMongoDBConnection();
    return mongoClientConnection;
  } catch (err) {
    console.error("Error connecting to Mongo DB");
  }
}

const acquireDBReference = async function (requestedDatabaseName: string) {

    await EnsureMongoDBConnection()
    return GetDatabase(requestedDatabaseName)

}

let EnsureMongoDBConnection = async () => {

  if (!mongoClientConnection) {

    console.log(`MongoDB will try to connect to ${connectionString} `)
    mongoClientConnection = await client.connect();
    console.log(`MongoDB connection successfully created for ${connectionString} `)
  } else {
    //console.log('will re-use existing database connection')
  }
}

const GetDatabase = (requestedDatabaseName: string) => {

  const databaseReference = mongoClientConnection.db(requestedDatabaseName); 
  return databaseReference;

}

const startSession = async () => {

  try {
    await EnsureMongoDBConnection();
    const session = mongoClientConnection.startSession();
    return session;
  } catch (err) {
    console.error("Error starting session:", err);
  }

}

let closeAllConnections = async function () {

  try {

    if (!!mongoClientConnection) {
      // console.log(`dbConnectionManager is closing connection to ${JSON.stringify(mongoClientConnection,null,2)}`)
      console.log(`\r\ndbConnectionManager is closing MongoDB connection`)
      await mongoClientConnection.close(); // Deprecated - use mongoClient.close()
    }

  } catch (err) {

    console.error("dbConnectionManager Error closingConnections:", err);

    return err;
  }
}


export const DBConnectionManager = { startSession, acquireDBReference, closeAllConnections, aquireClient };