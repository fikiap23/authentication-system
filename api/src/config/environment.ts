import 'dotenv/config'

const CONFIG = {
  db: process.env.MONGODB_URI,
  jwt_public_key: process.env.JWT_PUBLIC_KEY,
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  email: process.env.EMAIL,
  email_pass: process.env.EMAIL_PASS,
  client_url: process.env.CLIENT_BASE_URL,
}

export default CONFIG
