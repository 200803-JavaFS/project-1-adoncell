let userId = sessionStorage.getItem("userId");

document.getElementById("AllReimbsBtn").addEventListener("click", AllReimbs);
document.getElementById("findReimbByStatusBtn").addEventListener("click", findReimbByStatus);
document.getElementById("updateStatusBtn").addEventListener("click", updateStatus);
document.getElementById("logoutBtn").addEventListener("click", logout);

async function AllReimbs() {
    document.getElementById("reimb_body").innerText="";

    let resp = await fetch(url + "reimbursements", {
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

async function findReimbByStatus() {
    document.getElementById("reimb_body_2").innerText = "";
    let status = document.getElementById("statusIdInput");
    let idNumber = status.value;

    let resp = await fetch(url + "reimbursmentsByStatus/" + idNumber, {
        credentials: "include"
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
            document.getElementById("reimb_body_2").appendChild(row);
        }
    }
}

async function updateStatus() {
    let reimbId = document.getElementById("reimbIdInput");
    let idNumber = reimbId.value;

    const rStatus = document.querySelectorAll('input[name="status"]');
    let chooseStatus;
    for (const status of rStatus) {
        if (status.checked) {
            chooseStatus = status.value;
            break;
        }
    }

    let reimbStatus = {
        reimbId: idNumber,
        reimbAuthor: userId,
        reimbStatus: chooseStatus
    }
    
    let resp = await fetch(url + "updateStatus", {
    	method: 'POST';
    	body:JSON.stringify(reimbStatus),
    	credentials: "include"
    });

    if (resp.status === 202) {
        document.getElementById("updateSuccess").innerHTML = "Reimbursement updated";
    } else {
        document.getElementById("updateSuccess").innerHTML = "Reimbursement failed to update";
    }
}

async function logout() {

    let resp = await fetch(url + "logout", {
        credentials: 'include'
    });

    if (resp.status == 200) {
        window.location.href = "index.html";
    }
}

