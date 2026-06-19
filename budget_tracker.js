        document.addEventListener("DOMContentLoaded", caricaElementi);
        function aggiungiElemento() {
            const input = document.getElementById("itemInput");
            const testo = input.value.trim();
            if (testo === "") return;
            let elementi = JSON.parse(localStorage.getItem("iMieiDati")) || [];
            elementi.push(testo);
            localStorage.setItem("iMieiDati", JSON.stringify(elementi));
            mostraLista(elementi);
            input.value = "";
        }
        function caricaElementi() {
            let elementi = JSON.parse(localStorage.getItem("iMieiDati")) || [];
            mostraLista(elementi);
        }
        function mostraLista(elementi) {
            const ul = document.getElementById("listaElementi");
            ul.innerHTML = "";
            elementi.forEach(testo => {
                const li = document.createElement("li");
                li.textContent = testo;
                ul.appendChild(li);
            });
        }
let tot_entrate = 0;
let tot_uscite = 0;
let tot_tot = 0;
let transazioni = [];
function aggiorna(){
    tot_entrate = 0;
    tot_uscite = 0;
    for(let transazione of transazioni){
        if(transazione.tipo === 'entrata'){
            tot_entrate += transazione.importo;
        }else{
            tot_uscite += transazione.importo;
        }
    }
    tot_tot = tot_entrate - tot_uscite;
    document.getElementById('entrate').textContent = tot_entrate.toFixed(2) + ' €';
    document.getElementById('uscite').textContent = tot_uscite.toFixed(2) + ' €';
    document.getElementById('tot').textContent = tot_tot.toFixed(2) + ' €';
    if(tot_tot >= 0){
        document.getElementById('tot').style.color = 'green';
    }else{
        document.getElementById('tot').style.color = 'red';
    }
    const filtro = document.getElementById('filtro-tipo').value;
    const tbody = document.getElementById('cronologia');
    tbody.innerHTML = '';
    for(let transazione of transazioni){
        if(filtro === 'tutte'){
        }else if(filtro === 'entrata' && transazione.tipo !== 'entrata'){
            continue;
        }else if(filtro === 'uscita' && transazione.tipo !== 'uscita'){
            continue;
        }
        const row = document.createElement('tr');
        const cellData = document.createElement('td');
        cellData.textContent = transazione.data;
        row.appendChild(cellData);
        const cellTipo = document.createElement('td');
        cellTipo.textContent = transazione.tipo;
        const classeTipo = transazione.tipo === 'entrata' ? 'tipo-entrata' : 'tipo-uscita';
        cellTipo.className = classeTipo;
        row.appendChild(cellTipo);
        const cellDescrizione = document.createElement('td');
        cellDescrizione.textContent = transazione.descrizione;
        row.appendChild(cellDescrizione);
        const cellCategoria = document.createElement('td');
        cellCategoria.textContent = transazione.categoria;
        row.appendChild(cellCategoria);
        const cellImporto = document.createElement('td');
        cellImporto.textContent = transazione.importo.toFixed(2) + ' €';
        cellImporto.style.color = transazione.tipo === 'entrata' ? 'green' : 'red';
        row.appendChild(cellImporto);
        tbody.appendChild(row);
    }
}
function aggiungi(tipo, importo, descrizione, categoria, data){
    const transazione = {
        tipo: tipo,
        importo: parseFloat(importo),
        descrizione: descrizione,
        categoria: categoria,
        data: data
    };
    transazioni.push(transazione);
    aggiorna();
}
document.getElementById('bottone').addEventListener('click', function(e){
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const importo = document.getElementById('importo').value;
    const descrizione = document.getElementById('descrizione').value;
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;
    if(tipo === "" || importo === '' || descrizione === '' || categoria === '' || data === ''){
        alert('Compilare tutti i campi');
        return;
    }
    aggiungi(tipo, importo, descrizione, categoria, data);
    document.getElementById('tipo').value = '';
    document.getElementById('importo').value = '';
    document.getElementById('descrizione').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('data').value = '';
    alert('Transazione salvata');
});
document.getElementById('filtro-tipo').addEventListener('change', function(){
    aggiorna();
});
aggiorna();