// Single question
Meetupdetails()

function Meetupdetails() {
  var id = location.search.split('questionid=')[1];
  console.log(id);

  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/questions/${id}`;
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

      var idNode = document.getElementById('quest')
      idNode.innerHTML = `<b>Question:</b>  ${data.question.question_id}`

      var titleNode = document.getElementById('title')
      titleNode.innerHTML = `<b>Title:</b> ${data.question.title}`

      var bodyNode = document.getElementById('body')
      bodyNode.innerHTML = `${data.question.body}`

      var votesNode = document.getElementById('votes')
      votesNode.innerHTML = `<b>Votes:</b> ${data.question.votes}`

      var usernameNode = document.getElementById('username')
      usernameNode.innerHTML = `<i>Posted By</i>: ${data.question.user_id}`
      

    }
  })

}
