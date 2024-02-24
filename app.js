//Import
const mysql = require('mysql');
const express = require('express');
app = express();


// baza danych
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'czarni'
});

app.listen(80, () => {
    console.log('czarnuchy.mooo.com');
      
 });

connection.connect((err) => {
    if (err) {
        console.log("błąd połączenia");
    } else {
        console.log("baza połączona");
    }
});

const sql = 'SELECT * FROM uzytkownicy LIMIT 5';

const a  = connection.query(sql, (err, result) => {
    if (err) {
        console.log("err");
        res.status(500).send('Server error')
    } else {
        console.log(result);
        sqlres = result
    }
});



//middle

app.use((req, res, next) => {
    console.log('Ścieżka: ', req.url);
    console.log('Metoda: ', req.method);
    console.log('Czas: ', new Date());
    console.log('Adres IP: ', req.ip);
    console.log('Host: ', req.hostname);
    console.log('Język: ', req.get('Accept-Language'));
    let ip = req.ip
    next();
})




app.use(express.static('static'));

app.set('view engine', 'ejs');
app.set('views', 'strony');



app.get('/', (req, res) => {
   let ips = req.ip
  res.status(200).render('index', {result: sqlres , ips});
});



app.use((req, res) => {
    res.status(404).render('404')
    });

