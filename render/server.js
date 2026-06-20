const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));
let databaseTemporaneo = [];
app.post('/salva', (req, res) => {
    databaseTemporaneo.push(req.body);
    res.json({ message: "Dati salvati con successo!" });
});
app.get('/dati', (req, res) => {
    res.json(databaseTemporaneo);
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});