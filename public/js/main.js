const products = []
const cardBody = document.getElementById("contenCard")


fetch('data.json')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else if (response.status === 404) {
            return Promise.reject('error 404')
        } else {
            return Promise.reject('some other error: ' + response.status)
        }
    })
    .then(json => {
        console.log(json)
        let p = json
        for (const i of p) {
            products.push(i)
        }
    })
    .catch((err) => {
        console.log(`Fetch problem: ${err}`);
    });



const renderTable = data => {
    const row = data.map(i => {
        return (`<div class="col mb-2"
                    <div class="card border-3 rounded">
                        <img src=${i.thumbnail} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h6"> ${i.title}</h5>
                            <p class="card-text"> $${i.price} </p>
                            <button name=${i.id} id="btn-card${i.id}" class="btn btn-primary btn-producto"> Agregar al Carrito </button>
                        </div>
                    </div>
                </div>`)
    });


    cardBody.innerHTML = row
}