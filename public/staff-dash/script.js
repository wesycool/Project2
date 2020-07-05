// Get Transactions
async function getTransaction() {
    const data = await fetch("./pat-test/transactions").then(response => response.json())
    // .then(data => {console.log(data)})
    document.querySelector("#transactions").innerHTML = ``
    for ( let idx = 0 ; idx < data.length ; idx++ ) { 
        document.querySelector("#transactions").innerHTML += 
            `<button id="trns${data[idx].id}" data-transaction="${data[idx].id}" data-status="${data[idx].status}" type="button" class="btn" onclick="changeStatus(event)">${data[idx].id} -- ${data[idx].status} -- ${data[idx].client_id}</button>`
        
            // append color based on status
        const myStatus = document.querySelector(`#trns${data[idx].id}`)

        switch (data[idx].status) {
            case "Pending":
                myStatus.classList.add("btn-danger");
            break;
            case "Preparing":
                myStatus.classList.add("btn-warning");
            break;
            case "Delivering":
                myStatus.classList.add("btn-success");
            break;
            case "Complete":
                myStatus.classList.add("complete");
            break;
        }
    }
}

async function updateStatus(id, status) {
    // let newStatus
    
    

    await fetch(`./pat-test/${id}/${status}`)
}

// Function to check and change colour of button
async function changeStatus(event) {
    const button = event.target
    const status = button.dataset.status

    
    const transactionNum = event.target.dataset.transaction
    console.log(transactionNum)
    
    if (status == "Pending") { button.classList.toggle("pending");
        // button.classList.remove("pending");
        // button.classList.add("prep");
        button.classList.remove("btn-danger")
        button.classList.add("btn-warning");
        console.log("Pending => Updating to Preparing")

        await updateStatus(transactionNum, status)
    } else if (status == "Preparing") { 
        // button.classList.remove("prep");
        // button.classList.add("delivery");
        button.classList.remove("btn-warning")
        button.classList.add("btn-success");
        console.log("Preparing => Updating to delivering")

        await updateStatus(transactionNum, "Delivering")
    } else if (status == "Delivering") {
        // button.classList.remove("delivery");
        // button.classList.add("complete");
        button.classList.add("invisible");
        console.log("Delivering => Updating to complete")

        await updateStatus(transactionNum, "Complete")
    } 
}


getTransaction()