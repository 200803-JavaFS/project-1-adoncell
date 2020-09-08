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
    });

    if (resp.status === 200) {
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
    
    if(resp.status === 200) {
        let data = await resp.json();
        let userId = data.id;
        sessionStorage.setItem("userId", userId);
        
        let userRole = data.role.id;

        if (userRole == 1) {
            window.location.href = "Employee.html";
        } else if (userRole == 2) {
            window.location.href = "Manager.html";
        }
    } else {
    	document.getElementById("login-row").innerText = "Login failed!";
    }
}