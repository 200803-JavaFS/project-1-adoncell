const url = "http://localhost:8080/project1/"

document.getElementById("loginbtn").addEventListener("click", loginFunc);

async function loginFunc() {
    let usern = document.getElementById("username").value;
    let userp = document.getElementById("password").value;

    let user = {
        username: usern,
        password: userp
    }

    let resp = await fetch(url + "login", {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: "include"
    })

    if (resp.status === 200) {
        console.log(resp)
        document.getElementById("login-row").innerText = "YOU HAVE LOGGED IN.";
        redirect();
    } else {
        document.getElementById("login-row").innerText = "Login failed!";
    }

async function redirect() {
    let resp = await fetch(url + "success", {
        method: 'GET',
        credentials: "include"
    });
    console.log(resp.status);
    if(resp.status === 200) {
        console.log(resp);
        let data = await resp.json();
        console.log(data);
        let userId = data.id;
        sessionStorage.setItem("role_id", userId);

        if (userId == 1) {
            window.location.href = "Employee.html";
        } else if (userId == 2) {
            window.location.href = "Manager.html";
        }
    }
}