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
                <a onClick="stashId(${meetup.meetup_id}); deleteOneMeetup();"<button class="brown">Delete Meetup</button></a>
            </div>
                `;
            })

        }

    })

//Delete a meetup
function deleteOneMeetup() {
    let meetupId = sessionStorage.getItem('meetupid');
    let meetUrl = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/upcoming/${meetupId}`;
    let token = window.localStorage.getItem('token');
    fetch(meetUrl, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
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
                alert(data.message)
            }
            setTimeout(function() {
                window.location.assign("dashboard.html");
            })

        })
}

// Signup new user

postMeetup = () => {
    let meetupUrl = 'https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/upcoming';
    let location = document.getElementById('location').value;
    let images = document.getElementById('images').value;
    let title = document.getElementById('title').value;
    let happeningOn = document.getElementById('happeningOn').value;
    let tags = document.getElementById('tags').value;
    let token = window.localStorage.getItem('token');

    data = {
        "location": location,
        "images": images,
        "title": title,
        "happeningOn": happeningOn,
        "tags":tags
    }

    fetch(meetupUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 409) {
                // if conflicting
                document.getElementById('output').style.color = 'blue'
                document.getElementById('output').innerHTML = data.sessage
            }
            if (data.status === 401) {
                // if badrequest
                document.getElementById('output').style.color = 'blue'
                document.getElementById('output').innerHTML = data.message
            }
            if (data.status === 201) {
                // if request is successful
                alert(data.message)
                setTimeout(function() {
                    window.location.assign("dashboard.html");
                })
            }

        })

}