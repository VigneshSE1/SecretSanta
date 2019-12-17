function checklogin() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userinfo = { email, password };

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:3000/login");

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(userinfo));

    xhttp.onreadystatechange = function() {
        console.log("inside login")
        if (this.readyState == 4 && this.status == 200) {
            if (email == "admin@admin.com", password == "12345678") {
                window.location = "file:///D:/Zenclass/SecretSanta/Html_Content/admin_dashboard.html";
            } else {
                window.location = "file:///D:/Zenclass/SecretSanta/Html_Content/player_dashboard.html";
            }
            console.log(email);
            console.log(password);

        }
    }

}

function redirect() {
    window.location = "file:///D:/Zenclass/SecretSanta/Html_Content/register.html";
}