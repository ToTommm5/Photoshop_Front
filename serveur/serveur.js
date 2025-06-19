require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers Angular compilés dans dist/frontend
app.use(express.static(path.join(__dirname, "../dist/frontend")));

// Pour toutes les autres routes non gérées par l'API, renvoyer index.html d'Angular
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/frontend/index.html"));
});

app.post("/api/envoyer-commande", async (req, res) => {
  const { nom, prenom, email, cartItems } = req.body;

  const message = `
Nouvelle commande reçue :
Nom : ${nom}
Prénom : ${prenom}
Email : ${email}

Photos commandées :
${cartItems
  .map(
    (item) =>
      `- Photo : ${item.original_name}, Taille : ${item.size}, Quantité : ${item.quantity}`
  )
  .join("\n")}
`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Commande site photo" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_DEST,
      subject: "Nouvelle commande",
      text: message,
    });

    res.status(200).send({ message: "Commande envoyée par email !" });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res.status(500).send({ message: "Erreur lors de l'envoi du mail" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend en écoute sur http://localhost:${PORT}`);
});
