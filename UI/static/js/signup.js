// Signup new user

signup = () => {
    let registrationUrl = 'https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/auth/signup';
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmpassword = document.getElementById('confirmpassword').value;

    if (password !== confirmpassword) {
        let message = 'The passwords do not match'
        document.getElementById('output').style.color = 'blue'
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
            if (data.Status === 409) {
                // if conflicting
                document.getElementById('output').style.color = 'blue'
                document.getElementById('output').innerHTML = data.Message
            }
            if (data.Status === 400) {
                // if badrequest
                document.getElementById('output').style.color = 'blue'
                document.getElementById('output').innerHTML = data.Message
            }
            if (data.Status === 406) {
                // if not acceptable
                document.getElementById('output').style.color = 'blue'
                document.getElementById('output').innerHTML = data.Message
            }
            if (data.Status === 201) {
                // if request is successful
                document.getElementById('output').style.color = 'green'
                document.getElementById('output').innerHTML = data.Message
                setTimeout(function() {
                    window.location.assign("login.html");
                })
            }

        })

}