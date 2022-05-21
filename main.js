/*---VARIABLES DE ENTORNO GLOBAL---*/
const URL = 'https://e-commerce-api-academlo.herokuapp.com/api/products'
let editingId = null;

/*---MOSTRAR PRODUCTOS---*/
function printProducts(products) {

    const container = document.getElementById('products-container');
    
    let html = '';

    for(let i = 0; i < products.length; i++) {

        /* Para tomar en cuenta las imagen de la base de dato se cambia la url por products[i].image, se coloca una url predeterminada por motivos de estilo. */

        html += `<div class="product-card">
                    <div class="container-img">
                        <img src="https://j4pro.com/wp-content/uploads/Ley-comercio-electronico-colombia.jpg" alt="product-${products[i].id}" class="product-img"> 
                    </div>
                    <div class="product-info">
                        <h4 class="podruct-title">${products[i].name}</h4>
                        <p class="product-price">$ ${products[i].price}</p>
                        <div class="button">
                            <button type="button" onclick="deleteProduct(${products[i].id}, '${products[i].name}')" class="delete-product button-edit"><i class="fas fa-backspace"></i></button>
                            <button type="button" onclick="editProduct(${products[i].id}, '${products[i].image}', '${products[i].name}', ${products[i].price})" class="edit-product button-edit"><i class="fas fa-edit"></i></i></button>
                        </div>
                    </div>
                </div>`
    }

    container.innerHTML = html;

}

/*---OBTENER PRODUCTOS---*/
function getProducts(URL) {

    axios.get(URL)
        .then(res => {
            console.log(res.data);
            const products = res.data;
            printProducts(products);
        })
        .catch(error => {
            console.log(error);
        })

}

/*---AGREGAR PRODUCTO---*/
function addProduct() {

    let addImg = document.getElementById('addImg').value;
    let addName = document.getElementById('addName').value;
    let addPrice = document.getElementById('addPrice').value;

    if (!addImg && !addName && !addPrice) {
        alert('Es necesario ingresar todos los datos para crear un nuevo producto')
    } else {

        const addProduct = {
            image: addImg,
            name: addName,
            price: addPrice
        }

        axios.post(URL, addProduct)
        .then(res => {
            console.log(res);
            alert(`Acaba de agregar un nuevo producto: ${addProduct.name}`);
            getProducts(URL);
        })
        .catch(error => {
            console.log(error);
            alert(`No se puede agregar el producto: ${addProduct.name}`);
        })

        document.getElementById('addName').value = "";
        document.getElementById('addPrice').value = "";
    }

}

/*---EDITAR PRODUCTO---*/
function editProduct(id, image, name, price) {

    const confirmation = confirm(`¿Segur@ desea editar el producto ${name}?`);
    if(!confirmation){
        return
    }

    axios.get(`${URL}/${id}`)
        .then(() => {
            editingId = id;
            document.getElementById('editImg').value = image;
            document.getElementById('editName').value = name;
            document.getElementById('editPrice').value = price;
        })
        .catch(error => {
            alert(`No se puede editar el producto: ${name}`);
            console.log(error);
        })
        
}

/*---ACTUALIZAR PRODUCTO---*/
function updateProduct() {

    let editImg = document.getElementById('editImg').value;
    let editName = document.getElementById('editName').value;
    let editPrice = document.getElementById('editPrice').value;

    if (!editImg && !editName && !editPrice) {
        alert('Es necesario ingresar todos los datos para crear un nuevo producto')
    } else {
        
    const editedProduct = {
        image: editImg,
        name: editName,
        price: editPrice
    }

    axios.put(`${URL}/${editingId}`, editedProduct)
        .then(res => {
            alert(`El producto ${editedProduct.name} se acaba de actualizar correctamente`);
            getProducts(URL);
        })
        .catch(error => {
            alert('No se pudo editar la tarea');
        })
    
    document.getElementById('editImg').value = "";
    document.getElementById('editName').value = "";
    document.getElementById('editPrice').value = "";
    
    }

}

/*---ELIMINAR PRODUCTO---*/
function deleteProduct(id, name) {
    
    const confirmation = confirm(`¿Segur@ desea eliminar el producto ${name}?`);
    if(!confirmation){
        return
    }

    axios.delete(`${URL}/${id}`)
        .then(() => {
            alert(`El producto ${name} ha sido eliminado`);
            getProducts(URL);
        })
        .catch(error => {
            alert(`No se ha podido eliminar el producto ${name}`);
            console.log(error);
        })

}

getProducts(URL);
