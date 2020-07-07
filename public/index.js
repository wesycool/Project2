let cart = []
// get product list
async function getProducts() {
    const products = await fetch("./myapi/products").then(response => response.json())
    
    console.log(products)
        for (const {id, description, set_price} of products) {
            document.querySelector("#productBody").innerHTML += 
            `
            <div class="col-12 col-sm-6 col-md-4 mycol">
                <div data-id="${id}"class="card text-center" >
                    <img src="img/pizza.png" class="card-img-top" alt="${description}" />
                    <div class="card-body">
                        <h5 class="card-title">${description}</h5>
                        <p class="card-text">
                            ${set_price}
                        </p>
                        <div class="container" style="max-width:165px;">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend" id="button-addon3">
                                    <button data-productId="${id}" onclick="increase(event)" class="btn btn-outline-secondary" type="button"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                </svg></button>
                                </div>
                                <input id="qty${id}" data-productId="${id}" type="text" class="form-control text-center" value="0">
                                <div>
                                    <button data-productId="${id}" onclick="decrease(event)" class="btn btn-outline-secondary" type="button"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
}

function increase(event) {
    event.preventDefault();
    // console.log(event)
    
    const btn = event.currentTarget
    const productId = btn.dataset.productid
    const productBtn = document.querySelector(`#qty${productId}`).value

    let quantity = parseInt(productBtn) + 1 
    document.querySelector(`#qty${productId}`).value = quantity
    
    cart[productId] = {'quantity':quantity}

    // cart = {'id':productId, 'quantity':quantity}


    console.log(cart)
}

function decrease(event) {
    event.preventDefault()
    const btn = event.currentTarget
    const productId = btn.dataset.productid
    const productBtn = document.querySelector(`#qty${productId}`).value

    let quantity = productBtn > 0 ? parseInt(productBtn) - 1 : parseInt(productBtn)
    document.querySelector(`#qty${productId}`).value = quantity

    cart[productId] = {'quantity':quantity}
    // cart = {'id':productId, 'quantity':quantity}

    console.log(cart)

}

function checkout(event) {
    event.preventDefault()

    console.log(`cart before stringify`,cart)

    const result = cart.filter(cart => cart.quantity != 0)

    console.log(`cart before stringify`,result)

    sessionStorage.cart = JSON.stringify(result)

}

getProducts()