// User Login
signin = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loginUrl = 'https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/auth/login';
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
            if (data.Status === 400) {
                // if request is unsuccessful
                document.getElementById('output').style.color = 'blue'
                document.getElementById('output').innerHTML = data.Message
            }
            // store the token created when user is logged in
            if (data.Status === 200) {
                // if request is successful
                window.location.assign("meetups.html");
            }
            if (email === "admin@super.com" && data.Status === 200) {
                // if admin
                window.location.assign("dashboard.html");
            }
            window.localStorage.setItem('token', data.access_token);
        })
}