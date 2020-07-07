// get product list
async function getProducts() {
    const products = await fetch("./myapi/products").then(response => response.json())
    
    console.log(products)
    // style="width: 18rem;"
    // const prdbody = 
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
                                <input type="text" class="form-control text-center" placeholder="0">
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
    const button = event.currentTarget
    const productId = button.dataset.productId

    console.log(`increase`,productId)
    // sessionStorage
}

function decrease(event) {
    const button = event.currentTarget
    const productId = button.dataset.productId

    console.log(`decrease`,productId)

} 
getProducts()