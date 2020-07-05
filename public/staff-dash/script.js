// Get Transactions
async function getTransaction() {
    const data = await fetch("./pat-test/transactions").then(response => response.json())
    // .then(data => {console.log(data)})
    document.querySelector("#transactions").innerHTML = ``
    for ( let idx = 0 ; idx < data.length ; idx++ ) { 
        document.querySelector("#transactions").innerHTML += 
            `<button data-transaction="${data[idx].transaction_id}" data-status="${data[idx].status}" type="button" class="btn btn-outline-dark pending" onclick="changeStatus(event)">${data[idx].transaction_id} -- ${data[idx].status} -- ${data[idx].client_id}</button>`
    }
}

async function updateStatus(id, status) {
    // let newStatus
    
    // switch (status) {
    //     case "Pending":
    //         newStatus = "Preparing"
    //     break;
    //     case "Preparing":
    //         newStatus = "Delivering"
    //     break;
    //     case "Delivering":
    //         newStatus = "Complete"
    //     break;
    // }

    await fetch(`./pat-test/${id}/${status}`)
}

// Function to check and change colour of button
async function changeStatus(event) {
    const button = event.target
    const status = button.dataset.status

    
    const transactionNum = event.target.dataset.transaction
    console.log(transactionNum)
    
    if (status == "Pending") { button.classList.toggle("pending");
        button.classList.remove("pending");
        button.classList.add("prep");

        console.log("pending")

        await updateStatus(transactionNum, status)
    } else if (status == "Preparing") { 
        button.classList.remove("prep");
        button.classList.add("delivery");

        console.log("preparing")

        await updateStatus(transactionNum, "Delivering")
    } else if (status == "Delivering") {
        button.classList.remove("delivery");
        button.classList.add("complete");
        button.classList.add("invisible");
        console.log("delivering")

        await updateStatus(transactionNum, "Complete")
    } 
}


getTransaction()