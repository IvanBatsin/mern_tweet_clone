import mailer from '../core/mailer';

interface ISendMail {
  emailFrom: string,
  emailTo: string,
  subject: string,
  html: string,
}

export const sendMail = async ({
  emailFrom,
  emailTo,
  subject,
  html
}: ISendMail) => {
  try {
    await mailer.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: subject,
      html: html
    });
  } catch (err) {
    throw new Error('Message error');
  }
}