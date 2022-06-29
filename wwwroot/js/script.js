const uri = 'api/Restaurant';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get command.', error));
}

function addItem() {
    const entreeAdd = document.getElementById('entree');
    const platAdd = document.getElementById('plat');
    const dessertAdd = document.getElementById('dessert');
    const boissonAdd = document.getElementById('boisson');
    
    const commande = {
        isComplete: "En préparation",
        entree: entreeAdd.value.trim(),
        plat: platAdd.value.trim(),
        dessert: dessertAdd.value.trim(),
        boisson: boissonAdd.value.trim()
    };
    

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            commande.value = '';
        })
        .catch(error => console.error('Unable to add command.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === parseInt(id));

    const commande = {
        id: parseInt(id, 10),
        isComplete: "Livrée",
        entree: item.entree,
        plat: item.plat,
        dessert: item.dessert,
        boisson: item.boisson
    };
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));
    

    return false;
}


function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    
    
    
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Livrer';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);


        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let complete = document.createTextNode(item.isComplete)
        td1.appendChild(complete);

        let td2 = tr.insertCell(1);
        let entree = document.createTextNode(item.entree);
        td2.appendChild(entree);

        let td3 = tr.insertCell(2);
        let plat = document.createTextNode(item.plat);
        td3.appendChild(plat);

        let td4 = tr.insertCell(3);
        let dessert = document.createTextNode(item.dessert);
        td4.appendChild(dessert);

        let td5 = tr.insertCell(4);
        let boisson = document.createTextNode(item.boisson);
        td5.appendChild(boisson);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);
        
    });

    todos = data;
}