import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { STATUSES } from "../constants/ResponseStatuses";
import { MESSAGES } from "../constants/ResponceMessages";

dotenv.config();

export const sendEmail = async (emailTo, sender, message, subject) => {
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
      from: `"${sender}" <${process.env.EMAIL_SENDER}>`,
      to: emailTo,
      subject: subject,
      text: message,
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (patientRes, dataOrder, db,...queries) => {
  const mDataOrder = [
    ...dataOrder.slice(0, 1),
    patientRes.rows[0].p_id,
    ...dataOrder.slice(1),
  ];
  const orderRes = await db.query(queries[0], mDataOrder);
  if (orderRes.rows.length > 0) {
    let pharmaRes = await db.query(queries[1], [orderRes.rows[0].o_pharmacy]);
    const resData = patientRes.rows[0];
    resData.order = orderRes.rows[0];
    resData.pharmacyEmail = pharmaRes.rows[0].ph_email;
    return {
      status: STATUSES.CREATED,
      message: `Order ${MESSAGES.CREATED}`,
      data: resData,
    };
  } else {
    return {
      status: STATUSES.BAD_REQUEST,
      message: `Order ${MESSAGES.NOT_CREATED}`,
      data: [],
    };
  }
};
