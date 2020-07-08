displayPage()

// Hide and Display pages onClick Functions
function displayPage(){
    const tab = ['welcome','selection','checkout','status']
    for( const btn of tab){
        document.querySelectorAll(`#${btn}Btn`).forEach(getBtn => {
            getBtn.addEventListener('click',(event) => {
                for (const pg of tab){
                    document.querySelector(`#${pg}Page`).setAttribute('style', `display:${(btn == pg)? 'inherit' : 'none'}`)
                }
            })
        })
    }
}

// Selection Button onClick Function - Display Product List
document.querySelectorAll('#selectionBtn').forEach( button => {
    button.addEventListener('click',async () => {
        const products = await fetch('/staff-portal/api/table/products').then(response => response.json()).then(data => {return data})
        document.querySelector("#productBody").innerHTML = ''
        
        // Loop of Each Product Display into Cards
        for (const {id, description, set_price} of products) {
            document.querySelector("#productBody").innerHTML += 
            `<div class="col-12 col-sm-6 col-md-4 mycol">
                <div data-id="${id}" class="card text-center" >
                    <img src="img/pizza.png" class="card-img-top" alt="${description}" />
                    <div class="card-body">
                        <h5 id="desc${id}" class="card-title">${description}</h5>
                        <p id="price${id}" class="card-text">$${set_price}</p>
                        <div id="qtyBtn${id}"  class="container" style="max-width:165px;"></div>
                    </div>
                </div>
            </div>` 


            // Quantity Add-Remove Button
            document.querySelector(`#qtyBtn${id}`).innerHTML = 
            `<div class="input-group mb-3">
                <div class="input-group-prepend" id="button-addon3">
                    <button id='removeBtn-${id}' class="btn btn-danger" type="button">
                        <i class="fas fa-caret-left" id='removeBtn-${id}'></i>
                    </button>

                    <input id="qty${id}" type="text" class="form-control text-center" value="0">

                    <button id='addBtn-${id}' class="btn btn-success" type="button">
                        <i class="fas fa-caret-right" id='addBtn-${id}'></i>
                    </button>
                </div>
            </div>`


            // Quantity Add-Remove Button onClick Function
            document.querySelectorAll(`#button-addon3`).forEach( btn => {
                btn.addEventListener('click', (event) => {
                    const [field,id] = event.target.id.split('-')
                    const qtyField = document.querySelector(`#qty${id}`)

                    switch (field){
                        case'addBtn': 
                            qtyField.value = Number(qtyField.value) + 1;
                            break;
                        case'removeBtn': 
                            if (qtyField.value != 0) qtyField.value = Number(qtyField.value) - 1;
                            break;
                    }
                })
            })

        }
    })
})


// 
document.querySelectorAll(`#checkoutBtn`).forEach(getBtn => {
    getBtn.addEventListener('click', () => {
        startCheckout(result)
    })
})




// function selectionDone(event) {
//     event.preventDefault()

//     console.log(`cart before stringify`,cart)

//     const result = cart.filter(cart => cart.quantity !== 0)

//     sessionStorage.cart = JSON.stringify(result)

//     console.log(`cart before stringify`, result)

//     startCheckout(result)

// }
// // code ***END*** for selection page




// function startCheckout(data){
//     const cartItems = data
//     document.querySelector('#numCartItems').innerText = `${cartItems.length}`

//     for (item of cartItems) {
//         if (item.quantity > 0) {
//             document.querySelector('#cartItems').innerHTML +=
//             `<td><h6 class="my-0">${item.description}</h6></td>
//             <td class="text-muted">${item.price}</td>`
            
//             // <li class="list-group-item d-flex justify-content-between lh-condensed">
//             //     <div>
//             //         ${item.description}
//             //     </div>
//             //     <span >${item.price}</span>
//             // </li>
            
//         }
//     // }

//     // document.querySelector('#cartItems').innerHTML +=
//     // `
//     // <li class="list-group-item d-flex justify-content-between">
//     //     <span>Subtotal</span>
//     //     <strong id="gross_total">$20</strong>
//     // </li>
//     // <li class="list-group-item d-flex justify-content-between">
//     //     <span>Tax</span>
//     //     <strong id="tax_amount">$20</strong>
//     // </li>
//     // <li class="list-group-item d-flex justify-content-between">
//     //     <span>Total</span>
//     //     <strong id="net_total">$20</strong>
//     // </li>
//     // `
//     }
// }


// // Register page grabbing client info
// let form = {} 

// function checkout(event) {
//     event.preventDefault()
//     const first_name = document.querySelector('#firstName').value
//     const last_name = document.querySelector('#lastName').value
//     const email = document.querySelector('#email').value
//     const address = document.querySelector('#address').value
//     const address_2 = document.querySelector('#address2').value
//     const country = document.querySelector('#country').value
//     const province = document.querySelector('#province').value
//     const city = document.querySelector('#city').value
//     const postal_code = document.querySelector('#postal').value
//     const phone = document.querySelector('#postal').value
//     form = {first_name, last_name, email, address, address_2, country, province, city, postal_code, phone}
//     console.log(form)
//     // localStorage.completeForm = JSON.stringify(form)

//     document.querySelector('#checkoutPage').classList.toggle('dropdown')
//     document.querySelector('#statusPage').classList.toggle('dropdown')

//     confirmClient(form)
// }
// // code ***END*** for checkout page



// // Add client info of current transaction
// async function confirmClient(data){
//     // PLaceholder for grabbing current status
//     // fetch('/staff-portal/api/table/client/email/{the email}')
//     // const transactions = await fetch("/staff-portal/api/table/transactions").then(response => response.json())
//     // const transaction = transactions.filter(transaction => transaction.client_id = )
//     // fetch('./posttest', {method:'post', body: JSON.stringify(data)})


//     fetch('./posttest', { method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)});

//     // document.querySelector('#clientInfo').innerHTML =
//     //     `
//     //     <p>Name: ${clientInfo.first_name} ${clientInfo.last_name} 
//     //     <br>E-mail: ${clientInfo.email} 
//     //     <br>Address: ${clientInfo.address} 
//     //     ${clientInfo.address_2 ? `<br>Address 2: clientInfo.address_2` : ""} 
//     //     <br>Country: ${clientInfo.country} 
//     //     <br>Province: ${clientInfo.province}
//     //     <br>City: ${clientInfo.city} 
//     //     <br>Postal Code: ${clientInfo.postal_code} 
//     //     <br>Phone Number: ${clientInfo.phone}
//     //     <br>Transaction #${clientInfo.phone}</p>
//     //     `

//     // for (item of cartItems) {
//     //     if (item.quantity > 0) {
//     //         document.querySelector('#cartItemsStatus').innerHTML +=
//     //         `
//     //         <li class="list-group-item d-flex justify-content-between lh-condensed">
//     //             <div>
//     //                 <h6 class="my-0">${item.description}</h6>
//     //             </div>
//     //             <span class="text-muted">${item.price}</span>
//     //         </li>
//     //         `
//     //     }
//     // }
// }


