let user_id = sessionStorage.getItem("user_id");

async function getUserReimb() {
    document.getElementById("reimb_body").innerText = "";
    let user_id = sessionStorage.getItem("user_id");

    let resp = await fetch(url + "Reimbursements/" + user_id, {
        credentials: 'include'
    });

    if(resp.status === 200) {
        console.log(resp);
        let data = await resp.json();
        for (let reimbursement of data) {
            let row = document.createElement("tr");

            let cell1 = document.createElement("td");
            cell1.innerHTML = reimbursement.reimb_id;
            row.appendChild(cell1);

            let cell2 = document.createElement("td");
            cell2.innerHTML = reimbursement.reimb_id;
            row.appendChild(cell2);

            let cell3 = document.createElement("td");
            cell3.innerHTML = reimbursement.reimb_id;
            row.appendChild(cell3);

            let cell4 = document.createElement("td");
            if (reimbursement.reimb_resolved != null) {
                let time_resolved = new Date(reimbursement.reimb_resolved);
                cell4.innerHTML = time_resolved.toLocaleDateString();
                row.appendChild(cell4);
            } else {
                row.appendChild(cell4);
            }

            let cell5 = document.createElement("td");
            cell5.innerHTML = reimbursement.reimb_description;
            row.appendChild(cell5);

            let cell6 = document.createElement("td");
            cell6.innerHTML = reimbursement.reimb_author;
            row.appendChild(cell6);
            
            let cell7 = document.createElement("td");
            if (reimbursement.reimb_resolver != null) {
                cell7.innerHTML = reimbursement.reimb_resolver;
                row.appendChild(cell7);
            } else {
                row.appendChild(cell7);
            }

            let cell8 = document.createElement("td");
            cell8.innerHTML = reimbursement.reimb_status_id;
            row.appendChild(cell8);

            let cell9 = document.createElement("td");
            cell9.innerHTML = reimbursement.reimb_type_id;
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

    for (const i of types) {
        if (i.checked) {
            choice = i.value;
            break;
        }
    }

    let reimbursement = {
        reimb_amount: amount,
        reimb_description: description,
        reimb_author: user_id,
        i: choice
    }

    let resp = await fetch(url + "reimbursements", {
        method: 'POST',
        body: JSON.stringify(reimbursement),
        credentials: 'include'
    });

    if (resp.status == 201) {
        getUserReimb();
        document.getElementById("success").innerHTML = "Reimbursement added to the system";
    } else {
        document.getElementById("success").innerHTML = "Reimbursement not added";
    }

    async function logout() {
        let resp = await fetch(url + "logout", {
            credentials: 'include'
        });

        if (resp.status == 200) {
            console.log("logout");
            window.location.href = "project1.html";
        }
    }
}