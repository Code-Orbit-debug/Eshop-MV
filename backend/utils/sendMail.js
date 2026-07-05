const nodemailer = require("nodemailer");

// =======================
// SMTP EMAIL SERVICE
// =======================

const sendMail = async ({
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

        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,

        ...(port === 587 && {
          requireTLS: true,
        }),
      });

    console.log(
      "[sendMail] Sending email to:",
      email
    );

    const info = await transporter.sendMail({
      from: `"Eshop-MV" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject,
      text: message,
    });

    console.log(
      "[sendMail] SMTP success:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.log(
      "[SMTP Error]",
      error.message
    );

    throw new Error(
      error.message || "SMTP email failed"
    );
  }
};

module.exports = sendMail;