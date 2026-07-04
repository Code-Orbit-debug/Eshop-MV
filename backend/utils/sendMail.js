const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("@getbrevo/brevo");

const sendViaBrevo = async ({ email, subject, message }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_MAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Eshop-MV";

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is required for email delivery");
  }

  console.log("[sendMail] Sending via Brevo API to:", email);

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApi.apiKeys.apiKey, apiKey);

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = message.replace(/\n/g, "<br>");
  sendSmtpEmail.textContent = message;
  sendSmtpEmail.sender = {
    name: senderName,
    email: senderEmail,
  };
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.replyTo = { email: senderEmail };

  const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

  console.log("[sendMail] Brevo delivery success, messageId:", data.messageId);
  return data;
};

const sendViaSmtp = async ({ email, subject, message }) => {
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465;

  console.log(
    `[sendMail] Sending via SMTP (${process.env.SMTP_HOST}:${port}, secure=${secure}) to:`,
    email
  );

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    ...(port === 587 && { requireTLS: true }),
  });

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    text: message,
  });

  console.log("[sendMail] SMTP delivery success to:", email);
};

const sendMail = async (options) => {
  // Try Brevo first (recommended for production)
  if (process.env.BREVO_API_KEY) {
    return sendViaBrevo(options);
  }

  // Fallback to SMTP for local development
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_MAIL &&
    process.env.SMTP_PASSWORD
  ) {
    return sendViaSmtp(options);
  }

  throw new Error(
    "Email is not configured. Set BREVO_API_KEY (recommended for production) or SMTP credentials (for local development)."
  );
};

module.exports = sendMail;
