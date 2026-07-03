const nodemailer = require("nodemailer");

const sendViaResend = async ({ email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.SMTP_MAIL;

  if (!apiKey || !from) {
    throw new Error(
      "RESEND_API_KEY and RESEND_FROM (or SMTP_MAIL) are required for email delivery on Railway"
    );
  }

  console.log("[sendMail] Sending via Resend HTTPS API to:", email);

  const response = await fetch("https://api.resend.com/emails", {
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
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Resend API error (${response.status})`);
  }

  console.log("[sendMail] Resend delivery success, id:", data.id);
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
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(options);
  }

  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_MAIL &&
    process.env.SMTP_PASSWORD
  ) {
    return sendViaSmtp(options);
  }

  throw new Error(
    "Email is not configured. Set RESEND_API_KEY (recommended for Railway) or SMTP credentials."
  );
};

module.exports = sendMail;
