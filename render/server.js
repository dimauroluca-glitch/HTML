const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const MONGO_URI = "mongodb+srv://lucadimauro2009_db_user:r1IHOxgQuvOSs3MK@cluster0.h45ktfd.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connesso con successo a MongoDB Atlas!"))
    .catch(err => console.error("Errore di connessione al database:", err));
const DatoSchema = new mongoose.Schema({
    userId: { type: String, required: true }
}, { strict: false });
const Dato = mongoose.model('Dato', DatoSchema);
app.post('/salva', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) {
            return res.status(400).json({ message: "ID Utente anonimo mancante negli headers." });
        }
        const datiConUtente = { ...req.body, userId: userId };
        const nuovoDato = new Dato(datiConUtente);
        await nuovoDato.save(); 
        res.json({ message: "Dati salvati con successo per il tuo ID anonimo!" });
    } catch (err) {
        res.status(500).json({ message: "Errore nel salvataggio dei dati" });
    }
});
app.get('/dati', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) {
            return res.status(400).json({ message: "ID Utente anonimo mancante negli headers." });
        }
        const datiSalvati = await Dato.find({ userId: userId });
        res.json(datiSalvati);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero dei dati" });
    }
});
app.delete('/cancella', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) {
            return res.status(400).json({ message: "ID Utente anonimo mancante negli headers." });
        }
        await Dato.deleteMany({ userId: userId });
        res.json({ message: "La tua cronologia anonima è stata cancellata dal cloud!" });
    } catch (err) {
        res.status(500).json({ message: "Errore nella cancellazione dei dati" });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
