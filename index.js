const makeCard = (drink) => {
    // Generar el contenido HTML para el modal
    const modalContent = `
        <h5>${drink.strDrink}</h5>
        <img src='${drink.strDrinkThumb}' class='img-fluid mb-2' alt='${drink.strDrink}' />
        <p>${drink.strInstructionsES || drink.strInstructions || 'Sin instrucciones disponibles.'}</p>
    `;
    // Escapar comillas simples para evitar errores en el atributo onClick
    const safeContent = modalContent.replace(/'/g, "&#39;").replace(/\n/g, '');
    return `
    <div class="card" style="width: 18rem;">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${drink.strDrink}</h5>
            <input type="button" value="Ver receta" class="btn btn-primary" onClick="showModal('${drink.strInstructionsES}')">
        </div>
    </div>
    `;
}


const getList = () => {
    const nombre = document.getElementById('nombre').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`,
        {
            method: 'GET'
        }
    ).then(res => res.json())
    .then(data => {
        const {drinks} = data;
        const contenedor = document.getElementById('listaCocteles');
        contenedor.innerHTML = '';
        drinks.forEach(drink => {
            contenedor.innerHTML += makeCard(drink);
        })
        
    })
}

function showModal(instructions) {
    const modalBody = document.getElementById('modalBody');

    const constentHtml = `
        <h5>${instructions}</h5>`
    if (modalBody) {
        modalBody.innerHTML = constentHtml;
    }
    const modalElement = document.getElementById('coctelModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}
