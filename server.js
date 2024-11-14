const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000


app.use(cors());

app.use(express.json());

// odebranie z post fomualrza kontaktowego.
app.post('/save-contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Server odebrał i jest gotowy do wysłania danych:");
  console.log(`nazwa: ${name}\nemail: ${email}\nwiadomość: ${message}`);
  res.json({ message: "Formularz został zapisany!" });
});

// zwrócienie na get navbarku strony
app.get('/nav-bar', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'nav-bar.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać paska nawigacji.');
      return;
    }
    res.send(data);
  });
});

// zwrócienie na get stopki strony
app.get('/footer', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'footer.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać stopki.');
      return;
    }
    res.send(data);
  });
});

// zwrócienie na get głównej strony
app.get('/main', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'main.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać strony głównej.');
      return;
    }
    res.send(data);
  });
});

// zwrócienie na get galerii
app.get('/gallery', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'gallery.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać galerii.');
      return;
    }
    res.send(data);
  });
});

// zwrócienie na get formularza kontakt
app.get('/contact', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'contact.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Błąd serwera: nie udało się wczytać fomualrza kontaktowego');
      return;
    }
    res.send(data);
  });
});

// uruchomienie serwera na danym porcie
app.listen(port, () => {
  console.log(`Serwer działa na localhost:${port}`)
})

