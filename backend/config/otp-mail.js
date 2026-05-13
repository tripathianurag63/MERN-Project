import nodeMailer from "nodemailer";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailConfig = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password reset OTP",
    html: `<p>Your OTP for password reset is <strong>${otp}</strong> is valid for 10 minutes</p>`,
  };

  await transporter.sendMail(mailConfig);
};