import { ObjectId } from "mongodb";
import { getCollection } from "../../../app/db/getMongoCollection";

const DATABASE_NAME = "App";
const USERS_COLLECTION = "app_users";
const AUTH_ACCOUNTS_COLLECTION = "auth_accounts";

interface AppUserDocument {
  _id?: ObjectId;
  id?: string;
  name?: string;
  email?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface AuthAccountDocument {
  providerId: string;
  userId?: ObjectId | string;
}

function getUserLookupCandidates(userId: string) {
  const candidates: Array<{ id?: string; _id?: ObjectId; userId?: string }> = [
    { id: userId },
    { userId },
  ];

  if (ObjectId.isValid(userId)) {
    candidates.push({ _id: new ObjectId(userId) });
  }

  return candidates;
}

function getAccountLookupCandidates(userId: string) {
  const candidates: Array<{ userId: ObjectId | string }> = [{ userId }];

  if (ObjectId.isValid(userId)) {
    candidates.push({ userId: new ObjectId(userId) });
  }

  return candidates;
}

export async function getCurrentAppUser(userId: string) {
  const collection = await getCollection(DATABASE_NAME, USERS_COLLECTION);
  const document = await collection.findOne<AppUserDocument>(
    { $or: getUserLookupCandidates(userId) },
    { projection: { _id: 1, id: 1, name: 1, email: 1, createdAt: 1 } }
  );

  if (!document) {
    return null;
  }

  return {
    id: document.id ?? document._id?.toString() ?? userId,
    name: document.name ?? "",
    email: document.email ?? "",
    createdAt: document.createdAt ? new Date(document.createdAt) : new Date(),
  };
}

export async function getCurrentAppUserByEmail(email: string) {
  const collection = await getCollection(DATABASE_NAME, USERS_COLLECTION);
  const document = await collection.findOne<AppUserDocument>(
    { email },
    { projection: { _id: 1, id: 1, name: 1, email: 1, createdAt: 1 } }
  );

  if (!document) {
    return null;
  }

  return {
    id: document.id ?? document._id?.toString() ?? "",
    name: document.name ?? "",
    email: document.email ?? email,
    createdAt: document.createdAt ? new Date(document.createdAt) : new Date(),
  };
}

export async function getCurrentUserAuthMethods(userId: string) {
  const collection = await getCollection(DATABASE_NAME, AUTH_ACCOUNTS_COLLECTION);
  const documents = await collection
    .find<AuthAccountDocument>(
      { $or: getAccountLookupCandidates(userId) },
      { projection: { providerId: 1, _id: 0 } }
    )
    .toArray();

  return [...new Set(documents.map((document) => document.providerId))];
}

export async function getAllAppUsers() {
  const collection = await getCollection(DATABASE_NAME, USERS_COLLECTION);
  const documents = await collection
    .find<AppUserDocument>({}, { projection: { _id: 1, id: 1, name: 1, email: 1, createdAt: 1 } })
    .toArray();

  return documents.map((document) => ({
    id: document.id ?? document._id?.toString() ?? "",
    name: document.name ?? "",
    email: document.email ?? "",
    createdAt: document.createdAt ? new Date(document.createdAt) : new Date(),
  }));
}
