//This will be used to check if token is valid

const current_time = Date.now() / 1000;
const token = JSON.parse(localStorage.getItem("token"));

function tokencheck() {
    if (jwtDecode(token).exp < current_time || token === null) {
        localStorage.clear();
        window.location.href = "index.html";
    }
}
