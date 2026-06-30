import { getMongoClient } from "@/lib/mongodb"

let collectionPromise

export function getProfilesCollection() {
  if (!collectionPromise) {
    collectionPromise = getMongoClient().then(async (client) => {
      const collection = client.db("bittree").collection("links")
      await collection.createIndex({ handle: 1 }, { unique: true, name: "unique_handle" })
      return collection
    })
  }

  return collectionPromise
}
