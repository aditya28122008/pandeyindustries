const mongoUri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.i0otfyi.mongodb.net/${process.env.DATABASE_NAME}`
const GITHUB_ID = `${process.env.GITHUB_ID}`
const GITHUB_SECRET = `${process.env.GITHUB_SECRET}`
const GOOGLE_CLIENT_ID =`${process.env.GOOGLE_CLIENT_ID}`
const GOOGLE_CLIENT_SECRET =`${process.env.GOOGLE_CLIENT_SECRET}`


const vars = {mongoUri, GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET}

export default vars