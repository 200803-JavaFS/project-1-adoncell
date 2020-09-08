let user_id = sessionStorage.getItem("user_id");

async function AllReimbs() {
    document.getElementById("reimb_body").innerText="";

    let resp = await fetch(url + "reimbursements", {
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

async function findReimbByStatus() {
    document.getElementById("reimb_body_2").innerText = "";
    let status_id = document.getElementById("id_input");
    let status = status_id.value;

    let resp = await fetch(url + "reimbursments_by_status/" + status, {
        credentials: "include"
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

async function updateStatus() {
    let reimb_id = document.getElementById("reimb_id");
    let reimb_value = reimb_id.value;

    const status = document.querySelectorAll('input[name="status"]');
    let chooseStatus;
    for (const reimb_status of status) {
        if (reimb_status.checked) {
            chooseStatus = reimb_status.value;
            break;
        }
    }

    let rStatus = {
        reimb_id: reimb_value,
        reimb_author: user_id,
        reimb_status: chooseStatus
    }

    if (resp.status === 202) {
        document.getElementById("update_success").innerHTML = "Reimbursement updated";
    } else {
        document.getElementById("update_success").innerHTML = "Reimbursement failed to update";
    }
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

