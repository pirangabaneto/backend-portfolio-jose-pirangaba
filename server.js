require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  const mailOptions = {
    to: process.env.RECEIVER_EMAIL,
    subject: `Primeiro Contato`,
    text: `O usuário com o e-mail ${email} deseja entrar em contato.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ message: "Erro ao enviar e-mail." });
  }
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
