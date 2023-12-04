const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3030;
 
app.use(express.json());
app.use(cors({
    origin: '*'
}));


// Configuración del servidor de correo electrónico
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "erikmurmi@gmail.com",
    pass: "kmxbwbwvbrjyquhi"
  }
});

app.post("/sendPokemon", async function(req, res) {
  let recipient = req.body.email;
  let message = req.body.message;
  let pokemon = req.body.pokemon;

  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  //const albumsText = await response.json()
  // console.log('albums: ', response)
  const texto = await response.json()
  
  // Configuración del correo electrónico
  let mailOptions = {
    from: '"Welcome to our Pokedex" <erikmurmi@gmail.com>' ,
    to: recipient,
    subject: `Ahora eres ${pokemon.toUpperCase()} `,
    text: `${ pokemon.toUpperCase()} \n Habilities: ` +  JSON.stringify(texto["abilities"])
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo electrónico");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Correo electrónico enviado");
    }
  });
});

app.listen(PORT, function() {
  console.log("Servidor de correo electrónico escuchando en el puerto " + PORT);
});
