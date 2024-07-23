import { MongoClient } from "mongodb";
const uri = `${vars.mongoUri}`

const client = new MongoClient(uri)



export default client
