import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (to: string) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Bem-vindo ao nosso app!',
    text: 'Olá! Obrigado por se registrar no nosso aplicativo. Estamos felizes em ter você conosco!'
  };

  await transporter.sendMail(mailOptions);
};
