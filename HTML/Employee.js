let userId = sessionStorage.getItem("userId");

document.getElementById("getUserReimbBtn").addEventListener("click", getUserReimb);
document.getElementById("addReimbBtn").addEventListener("click", addReimb);
document.getElemebtById("logoutBtn").addEventListener("click", logout);

async function getUserReimb() {
    document.getElementById("reimb_body").innerText = "";
    let userId = sessionStorage.getItem("userId");

    let resp = await fetch(url + "ReimbursementsByUser/" + userId, {
        credentials: 'include'
    });

    if(resp.status === 200) {
        let data = await resp.json();
        for (let reimbursement of data) {
        	console.log(reimbursement);
            let row = document.createElement("tr");

            let cell1 = document.createElement("td");
            cell1.innerHTML = reimbursement.id;
            row.appendChild(cell1);

            let cell2 = document.createElement("td");
            cell2.innerHTML = reimbursement.amount;
            row.appendChild(cell2);

            let cell3 = document.createElement("td");
            let timeSubmit = new Date(reimbursement.submitted);
            cell3.innerHTML = timeSubmit.toLocaleDateString();;
            row.appendChild(cell3);

            let cell4 = document.createElement("td");
            if (reimbursement.resolved != null) {
                let resolvedTime = new Date(reimbursement.resolved);
                cell4.innerHTML = resolvedTime.toLocaleDateString();
                row.appendChild(cell4);
            } else {
                row.appendChild(cell4);
            }

            let cell5 = document.createElement("td");
            cell5.innerHTML = reimbursement.description;
            row.appendChild(cell5);

            let cell6 = document.createElement("td");
            cell6.innerHTML = reimbursement.author.id;
            row.appendChild(cell6);
            
            let cell7 = document.createElement("td");
            if (reimbursement.resolver != null) {
                cell7.innerHTML = reimbursement.resolver.id;
                row.appendChild(cell7);
            } else {
                row.appendChild(cell7);
            }

            let cell8 = document.createElement("td");
            cell8.innerHTML = reimbursement.statusId.id;
            row.appendChild(cell8);

            let cell9 = document.createElement("td");
            cell9.innerHTML = reimbursement.typeId.id;
            row.appendChild(cell9);
            document.getElementById("reimb_body").appendChild(row);
        }
    }
}

async function addReimb() {
    let amount = document.getElementById("reimb_amount").value;
    let description = document.getElementById("reimb_description").value;
    const types = document.querySelectorAll('input[name="gridRadios"]');
    let choice;

    for (const type of types) {
        if (type.checked) {
            choice = type.value;
            break;
        }
    }

    let reimbursement = {
        reimbAmount: amount,
        reimbDescription: description,
        reimbAuthor: userId,
        type: choice
    }

    let resp = await fetch(url + "reimbursements", {
        method: 'POST',
        body: JSON.stringify(reimbursement),
        credentials: 'include'
    });

    if (resp.status == 201) {
        getUserReimb();
        document.getElementById("addSuccess").innerHTML = "Reimbursement added to the system";
    } else {
        document.getElementById("addSuccess").innerHTML = "Reimbursement not added";
    }

async function logout() {
        let resp = await fetch(url + "logout", {
            credentials: "include"
        });

        if (resp.status == 200) {
            window.location.href = "index.html";
        }
    }
}