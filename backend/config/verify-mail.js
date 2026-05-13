import path from "node:path";
import fs from "node:fs";
import handleBars from "handlebars";
import nodeMailer from "nodemailer";

export const verifyMail = async (token, email) => {
  const filepath = path.join(import.meta.dirname, "template.hbs");
  const emailTemplateSource = fs.readFileSync(filepath, "utf-8");

  const template = handleBars.compile(emailTemplateSource);
  let htmlToSend = template({ token: encodeURIComponent(token) });

  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailConfiguration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    html: htmlToSend,
  };

  transport.sendMail(mailConfiguration, (err, info) => {
    if (err) {
      throw new Error(err);
    }
    console.log("Email sent successfully", info);
  });
};