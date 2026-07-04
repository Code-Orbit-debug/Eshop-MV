const nodemailer = require("nodemailer");
const Brevo = require("@getbrevo/brevo");

// =======================
// BREVO EMAIL SERVICE
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

    // ✅ Correct instance (works with current SDK)
    const apiInstance = new Brevo.TransactionalEmailsApi();

    // ✅ Correct auth method (stable approach)
    apiInstance.authentications = {
      apiKey: {
        apiKey: apiKey,
      },
    };

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

    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];

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

    // ❗ Don't crash signup
    return null;
  }
};

// =======================
// SMTP FALLBACK
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
  }
};

// =======================
// MAIN FUNCTION
// =======================
const sendMail = async (options) => {
  try {
    // Prefer Brevo if available
    if (process.env.BREVO_API_KEY) {
      await sendViaBrevo(options);
      return;
    }

    // fallback SMTP
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_MAIL &&
      process.env.SMTP_PASSWORD
    ) {
      await sendViaSmtp(options);
      return;
    }

    console.log("[sendMail] No email service configured");
  } catch (error) {
    console.log("[sendMail Error]", error.message);
  }
};

module.exports = sendMail;