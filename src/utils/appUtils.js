import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (emailTo,sender, message, subject) => {
  try {
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_EMAIL_SENDER,
      },
    });

    let info = await transporter.sendMail({
      from: `"${sender}" <${process.env.EMAIL_SENDER}>` ,
      to: emailTo,
      subject: subject,
      text: message,
    });
 
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.log(error);
  }
};
