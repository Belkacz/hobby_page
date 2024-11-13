const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.post('/save-contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Server odebrał i jest gotowy do wysłania danych:");
  console.log(`nazwa: ${name}\nemail: ${email}\nwiadomość: ${message}`);
  res.json({ message: "Formularz został zapisany!" });
});

app.get('/nav-bar', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'nav-bar.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać stopki');
      return;
    }
    res.send(data);
  });
});

app.get('/footer', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'footer.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać stopki');
      return;
    }
    res.send(data);
  });
});

app.get('/main', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'main.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać stopki');
      return;
    }
    res.send(data);
  });
});

app.get('/gallery', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'gallery.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać stopki');
      return;
    }
    res.send(data);
  });
});

app.get('/contact', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'contact.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać stopki');
      return;
    }
    res.send(data);
  });
});
