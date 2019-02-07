// User Login
login = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loginUrl = 'http://127.0.0.1:5000/api/v2/auth/login';
    fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 'Failed!') {
                // if request is unsuccessful
                document.getElementById('output').style.color = 'red'
                document.getElementById('output').innerHTML = data.message
            }
            // store the token created when user is logged in
            if (data.status === "Success!") {
                // if request is successful
                window.location.assign("meetups.html");
            }
            window.localStorage.setItem('token', data.token);
        })
}