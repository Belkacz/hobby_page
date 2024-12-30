const express = require('express');
const mysql = require('mysql2');

const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000


app.use(cors());

app.use(express.json());


// dane bazy
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tech_web',
  password: 'tech_web1',
  database: 'my_hobby',
  port: "3306"
});

// połączenie z bazą
db.connect(err => {
  if (err) {
    console.error('Błąd podczas łączenia z bazą danych:', err.message);
    return;
  }
  console.log('Połączono z bazą danych.');
});


// odebranie z post fomualrza kontaktowego.
app.post('/save-contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Server odebrał i jest gotowy do wysłania danych:");
  console.log(`nazwa: ${name}\nemail: ${email}\nwiadomość: ${message}`);

  const query = 'INSERT INTO contact_requests (name, email, message) VALUES (?, ?, ?)';
  const values = [name, email, message];

  // dodałem zapisywanie do bazy
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Błąd podczas zapisywania danych do bazy:', err);
      return res.status(500).json({ error: 'Wystąpił błąd podczas zapisywania danych.' });
    }

    console.log('Dane zostały zapisane w bazie:', result);
    res.json({ message: 'Formularz został zapisany!' });
  });
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

app.get('/contact-list', (req, res) => {
  const query = 'SELECT * FROM contact_requests';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania danych z bazy:', err);
      return res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
    }

    // Zwracamy dane w formacie JSON
    res.json(results);
  });
});

// uruchomienie serwera na danym porcie
app.listen(port, () => {
  console.log(`Serwer działa na localhost:${port}`)
})

