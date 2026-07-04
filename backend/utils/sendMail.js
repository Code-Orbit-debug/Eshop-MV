const nodemailer = require("nodemailer");
const Brevo = require("@getbrevo/brevo");

// =======================
// Brevo Email Service
// =======================
const sendViaBrevo = async ({ email, subject, message }) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      throw new Error("BREVO_API_KEY is missing");
    }

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL || process.env.SMTP_MAIL;

    const senderName =
      process.env.BREVO_SENDER_NAME || "Eshop-MV";

    console.log("[Brevo] Sending email to:", email);

    // ✅ Correct instance creation
    const apiInstance = new Brevo.TransactionalEmailsApi();

    // ✅ Correct API key setup (NEW SDK STYLE)
    apiInstance.apiClient.authentications["apiKey"].apiKey =
      apiKey;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

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

    sendSmtpEmail.to = [{ email }];

    sendSmtpEmail.replyTo = {
      email: senderEmail,
    };

    const response = await apiInstance.sendTransacEmail(
      sendSmtpEmail
    );

    console.log("[Brevo] Email sent successfully");
    return response;
  } catch (error) {
    console.log(
      "[Brevo Error]",
      error.response?.text || error.message
    );

    throw new Error(error.message || "Brevo failed");
  }
};

// =======================
// SMTP fallback
// =======================
const sendViaSmtp = async ({ email, subject, message }) => {
  try {
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    console.log(
      `[SMTP] Sending email via ${process.env.SMTP_HOST}:${port}`
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
      socketTimeout: 15000,

      ...(port === 587 && { requireTLS: true }),
    });

    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      text: message,
    });

    console.log("[SMTP] Email sent successfully");
  } catch (error) {
    console.log("[SMTP Error]", error.message);
    throw new Error(error.message || "SMTP failed");
  }
};

// =======================
// Main handler
// =======================
const sendMail = async (options) => {
  try {
    // Prefer Brevo in production
    if (process.env.BREVO_API_KEY) {
      return await sendViaBrevo(options);
    }

    // Fallback SMTP
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_MAIL &&
      process.env.SMTP_PASSWORD
    ) {
      return await sendViaSmtp(options);
    }

    throw new Error("No email service configured");
  } catch (error) {
    console.log("[sendMail] Final Error:", error.message);
    throw error;
  }
};

module.exports = sendMail;