import { MongoClient } from "mongodb";
const uri = `${process.env.MONGODB_URI}`

const client = new MongoClient(uri)
client.db(`${process.env.DATABASE_NAME_MONGO}`)

export default client