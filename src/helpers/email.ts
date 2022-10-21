import { createTransport } from 'nodemailer';
import { BadRequestException } from '@nestjs/common';
require('dotenv').config();

export function sendEmailWithNodemailer(emailData: any) {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'kaymkassai269',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      return info;
    })
    .catch((err) => {
      throw new BadRequestException('Failed to send email');
    });
}
