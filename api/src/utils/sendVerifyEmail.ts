import nodemailer, { Transporter } from 'nodemailer'
import CONFIG from '../config/environment'

const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  logger: true,
  debug: true,
  auth: {
    user: CONFIG.email,
    pass: CONFIG.email_pass,
  },
  tls: {
    rejectUnauthorized: true,
  },
})

interface MailOptions {
  from: string
  to: string
  subject: string
  text: string
}

async function sendVerificationEmail(
  userEmail: string,
  subject: string,
  text: string
): Promise<void> {
  const mailOptions: MailOptions = {
    from: 'taskplus.squad@gmail.com',
    to: userEmail,
    subject: subject,
    text: text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log(`Email sent: ${info.response}`)
    }
  })
}

export { sendVerificationEmail }
