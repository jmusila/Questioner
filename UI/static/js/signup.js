// Signup

signup = () => {
    let registrationUrl = 'http://127.0.0.1:5000/api/v2/auth/signup';
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmpassword = document.getElementById('confirmpassword').value;

    if (password !== confirmpassword) {
        let message = 'The passwords do not match'
        document.getElementById('output').style.color = 'red'
        document.getElementById('output').innerHTML = message
        return message
    }
    data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phoneNumber": phoneNumber,
        "username":username,
        "password": password
    }

    fetch(registrationUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.Status === 'Failed!') {
                // if request is unsuccessful
                document.getElementById('output').style.color = 'red'
                document.getElementById('output').innerHTML = data.Message
            }
            if (data.Status === "Success!") {
                // if request is successful
                document.getElementById('output').style.color = 'green'
                document.getElementById('output').innerHTML = data.Message
                setTimeout(function() {
                    window.location.assign("login.html");
                })
            }

        })

}