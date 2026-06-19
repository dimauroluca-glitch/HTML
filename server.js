const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Il server è online e funziona correttamente!');
});
let databaseTemporaneo = [];
app.post('/salva', (req, res) => {
    databaseTemporaneo.push(req.body);
    res.json({ message: "Dati salvati con successo!" });
});
app.get('/dati', (req, res) => {
    res.json(databaseTemporaneo);
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});