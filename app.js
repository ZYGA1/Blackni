//Import
const mysql = require('mysql');
const express = require('express');
const e = require('express');
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

const sql = 'SELECT * FROM uzytkownicy ORDER BY 1 desc LIMIT 5';

//middle

app.use((req, res, next) => {
    console.log('Ścieżka: ', req.url);
    console.log('Metoda: ', req.method);
    console.log('Czas: ', new Date());
    console.log('Adres IP: ', req.ip);
    console.log('Host: ', req.hostname);
    console.log('Język: ', req.get('Accept-Language'));
    next();
})

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'strony');

app.get('/', (req, res) => {
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("err");
            res.status(500).send('Server error')
        } else {
            console.log(result);
            sqlres = result;
            res.status(200).render('index', {result: sqlres , ips, name: 'Main'});
        }
    });
   let ips = req.ip;  
});

app.get('/dodaj', (req, res) => {
   res.status(200).render('dodaj', {name: 'Dodaj'});
 });

app.post('/dodaj', (req, res) => {
    if(req.body.gej == 'on'){
        req.body.gej = 1;
    } else { 
        req.body.gej = 0;
    }
    console.log(req.body.gej);
    sql1 = `INSERT INTO uzytkownicy (imie, nazwisko, gej) VALUES ('${req.body.imie}', '${req.body.nazwisko}', '${req.body.gej}')`;
    connection.query(sql1, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error')
        } else {
            console.log(result);
            res.redirect('/');
        }
    });
    console.log(req.body);
})

app.get('/') , (req, res) => {
    res.status(200).render('index', {name: 'Main'});
}

app.use((req, res) => {
    res.status(404).render('404')
});
