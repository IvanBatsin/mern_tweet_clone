import nodemailer from 'nodemailer';

const options = {
  host: process.env.NODEMAILER_HOST || "smtp.ethereal.email",
  port: Number(process.env.NODEMAILER_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER, 
    pass: process.env.NODEMAILER_PASS
  }
};

const transport = nodemailer.createTransport(options);
export default transport;