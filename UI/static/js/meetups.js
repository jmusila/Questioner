 // display all available meetups
    fetchMeetups()

    function fetchMeetups(){
      let url = 'https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/upcoming';
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
        if (data.status === 200){
    
          var meetups = document.getElementById('meetups')
          var meetupNodes = document.createDocumentFragment()
    
          data.data.forEach(meetup => {
    
              var meetupNode = document.createElement('div')
              meetupNode.className = 'column'

              var topicNode = document.createElement('p')
              topicNode.id = 'title'
              topicNode.textContent = meetup.title

              var timeNode = document.createElement('p')
              timeNode.id = 'time_added'
              timeNode.innerHTML = `<i>Date Posted:</i> ${meetup.time_added}`

              var locationNode = document.createElement('p')
              locationNode.id = 'location'
              locationNode.innerHTML = `<i>Location:</i> ${meetup.location}`
              
              var anchorNode = document.createElement('a')
              anchorNode.id = meetup.meetup_id.toString()
              anchorNode.href = "../UI/questions.html?meetupid=" + meetup.meetup_id
    
              var imgNode = document.createElement('img')
              imgNode.src = '../UI/static/images/meet.jpg'
    
              var dateNode = document.createElement('p')
              dateNode.id = 'happeningOn'
              dateNode.textContent = meetup.happeningOn
              dateNode.innerHTML = `<i>Happening On:</i> ${meetup.happeningOn}`
    
    
              anchorNode.appendChild(topicNode)
              anchorNode.appendChild(imgNode)
              anchorNode.appendChild(dateNode)
              anchorNode.appendChild(timeNode)
              anchorNode.appendChild(locationNode)
    
              meetupNode.appendChild(anchorNode)
    
              meetupNodes.appendChild(meetupNode)
    
          })
    
          meetups.appendChild(meetupNodes);
    
        } 
        if (data.status === 404) {
          // if request is unsuccessful
          document.getElementById('output').style.color = 'blue'
          document.getElementById('output').innerHTML = data.message
          return message
      }
      })
    
    } 
