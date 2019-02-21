// Single meetup
Meetupdetails()

function Meetupdetails() {
  var id = location.search.split('id=')[1];
  console.log(id);

  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/upcoming/${id}`;
  let token = window.localStorage.getItem('token');
    
  fetch(url, {
    method : 'GET',
    headers : {
      'Access-Control-Request-Headers': '*',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if(data.status == 200){
      console.log(data)

      var topicNode = document.getElementById('title')
      topicNode.innerHTML = data.meetup.title

      var imgNode = document.createElement('img')
      imgNode.src = '../UI/static/meet.jpg'

      var dateNode = document.getElementById('happeningOn')
      dateNode.innerHTML = `<i>Happening:</i> ${data.meetup.happeningOn}`

      var locationNode = document.getElementById('location')
      locationNode.innerHTML = `<i>Location:</i> ${data.meetup.location}`

      var datetimeNode = document.getElementById('time_added')
      datetimeNode.innerHTML = `<i>Posted</i>: ${data.meetup.time_added}`

      var post_question = document.getElementById('post-question')
      post_question.href = "../UI/questions.html?meetupid=" + data.meetup.meetup_id
      

    }
  })

}
