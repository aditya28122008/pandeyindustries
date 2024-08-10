const mongoUri = `mongodb+srv://pandeyIndustries:dFUZmLqhQ7a7uNQl@cluster0.i0otfyi.mongodb.net`
const upload_preset = "pandeyIndustries_dev"
const GITHUB_ID = `${process.env.GITHUB_ID}`
const GITHUB_SECRET = `${process.env.GITHUB_SECRET}`
const GOOGLE_CLIENT_ID =`${process.env.GOOGLE_CLIENT_ID}`
const GOOGLE_CLIENT_SECRET =`${process.env.GOOGLE_CLIENT_SECRET}`


const vars = {mongoUri, GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, upload_preset}

export default vars