function registerAsUser() {
    var username = document.getElementById('Username').value;
    var phonenumber = document.getElementById('Mobile').value;
    var email = document.getElementById('Email').value;
    var password = document.getElementById("Password").value;

    var userJSON = { username, phonenumber, email, password };

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:3000/userdata");

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(userJSON));

    xhttp.onreadystatechange = function() {
        console.log("inside")
        if (this.readyState == 4 && this.status == 200) {
            window.location = "file:///D:/Zenclass/SecretSanta/Html_Content/login.html"

        }
    }

}