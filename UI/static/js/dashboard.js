 // display all available meetups

 function stashId(inid) {
    sessionStorage.setItem('meetupid', inid)
}


let lst = document.getElementById('meetups');
let meetupsUrl = 'https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/upcoming';
let token = window.localStorage.getItem('token');
fetch(meetupsUrl, {
        method: 'GET',
        headers: {
            'Access-Control-Request-Headers': '*',
            'Authorization': 'Bearer ' + token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status === 404) {
            // if request is unsuccessful
            document.getElementById('output').style.color = 'blue'
            document.getElementById('output').innerHTML = data.message
            return message
        }
        if (data.status === 200) {
            // if request is successful
            let meetups = data.meetups; // Get the meetups
            return data.data.forEach(function(meetup) { 
                lst.innerHTML += `
                <div class="column">
                <p>${meetup.title}</p>
                <img src="static/images/${meetup.image}">
                <p><i>Date: </i>${meetup.happeningOn}</p>
                <p><i>Location: </i>${meetup.location}</p>
                <p><i>Time Posted: </i>${meetup.time_added}</p>
                <p>Intrested? <a href="#"><b>Click here to schedule</b></a></p>
                <a href="questions.html"><button>View Questions</button></a>
            </div>
                `;
            })

        }

    })
