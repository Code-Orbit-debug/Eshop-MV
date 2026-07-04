const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("@getbrevo/brevo");

// =======================
// Brevo Email Service
// =======================

const sendViaBrevo = async ({ email, subject, message }) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL ||
      process.env.SMTP_MAIL;

    const senderName =
      process.env.BREVO_SENDER_NAME ||
      "Eshop-MV";

    if (!apiKey) {
      throw new Error(
        "BREVO_API_KEY is missing in environment variables"
      );
    }

    console.log(
      "[sendMail] Sending via Brevo API to:",
      email
    );

    // Create API instance
    const apiInstance =
      new SibApiV3Sdk.TransactionalEmailsApi();

    // Set API key
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      apiKey
    );

    // Email object
    const sendSmtpEmail =
      new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = subject;

    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          ${message.replace(/\n/g, "<br>")}
        </body>
      </html>
    `;

    sendSmtpEmail.textContent = message;

    sendSmtpEmail.sender = {
      name: senderName,
      email: senderEmail,
    };

    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];

    sendSmtpEmail.replyTo = {
      email: senderEmail,
    };

    const response =
      await apiInstance.sendTransacEmail(
        sendSmtpEmail
      );

    console.log(
      "[sendMail] Brevo delivery success:",
      response
    );

    return response;
  } catch (error) {
    console.log(
      "[sendMail] Brevo Error:",
      error.message
    );

    throw new Error(
      error.message || "Brevo email failed"
    );
  }
};

// =======================
// SMTP Fallback
// =======================

const sendViaSmtp = async ({
  email,
  subject,
  message,
}) => {
  try {
    const port =
      Number(process.env.SMTP_PORT) || 587;

    const secure = port === 465;

    console.log(
      `[sendMail] Sending via SMTP (${process.env.SMTP_HOST}:${port})`
    );

    const transporter =
      nodemailer.createTransport({
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

        ...(port === 587 && {
          requireTLS: true,
        }),
      });

    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      text: message,
    });

    console.log(
      "[sendMail] SMTP delivery success"
    );
  } catch (error) {
    console.log(
      "[sendMail] SMTP Error:",
      error.message
    );

    throw new Error(
      error.message || "SMTP failed"
    );
  }
};

// =======================
// Main Email Handler
// =======================

const sendMail = async (options) => {
  try {
    // Prefer Brevo in production
    if (process.env.BREVO_API_KEY) {
      return await sendViaBrevo(options);
    }

    // Fallback for localhost
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_MAIL &&
      process.env.SMTP_PASSWORD
    ) {
      return await sendViaSmtp(options);
    }

    throw new Error(
      "Email service not configured"
    );
  } catch (error) {
    console.log(
      "[sendMail] Final Error:",
      error.message
    );

    throw error;
  }
};

module.exports = sendMail;