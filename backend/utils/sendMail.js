const nodemailer = require("nodemailer");

// =======================
// RESEND EMAIL SERVICE
// =======================

const sendViaResend = async ({
  email,
  subject,
  message,
}) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    const from =
      process.env.RESEND_FROM ||
      process.env.SMTP_MAIL;

    if (!apiKey || !from) {
      throw new Error(
        "RESEND_API_KEY and RESEND_FROM are required"
      );
    }

    console.log(
      "[sendMail] Sending via Resend API to:",
      email
    );

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [email],
          subject,
          text: message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Resend API Error (${response.status})`
      );
    }

    console.log(
      "[sendMail] Resend success:",
      data.id
    );

    return data;
  } catch (error) {
    console.log(
      "[Resend Error]",
      error.message
    );

    throw error;
  }
};

// =======================
// SMTP FALLBACK
// =======================

const sendViaSmtp = async ({
  email,
  subject,
  message,
}) => {
  try {
    const port =
      Number(process.env.SMTP_PORT) || 587;

    const transporter =
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,

        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      text: message,
    });

    console.log(
      "[sendMail] SMTP success"
    );
  } catch (error) {
    console.log(
      "[SMTP Error]",
      error.message
    );

    throw error;
  }
};

// =======================
// MAIN FUNCTION
// =======================

const sendMail = async (options) => {
  try {
    // Prefer Resend on Railway
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(options);
    }

    // Fallback SMTP
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_MAIL &&
      process.env.SMTP_PASSWORD
    ) {
      return await sendViaSmtp(options);
    }

    throw new Error(
      "Email not configured. Add RESEND_API_KEY or SMTP credentials."
    );
  } catch (error) {
    console.log(
      "[sendMail Error]",
      error.message
    );

    throw error;
  }
};

module.exports = sendMail;