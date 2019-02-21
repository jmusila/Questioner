// Get top questions
fetchQuestions()

function fetchQuestions(){
  var id = location.search.split('meetupid=')[1];
  console.log(id);

  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/${id}/questions`
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
    console.log(data);
    if (data.Status === 200){

      var questions = document.getElementById('questions')
      var questionNodes = document.createDocumentFragment()
  
      data.data.forEach(question => {

        var idNode = document.getElementById('qsn_id')
        idNode.innerHTML = `<i>Question</i> ${question.question_id}`

        var idNode = document.getElementById('solution')
        idNode.innerHTML = `<b>Title: </b> ${question.title}`

        var idNode = document.getElementById('body')
        idNode.innerHTML =  question.body

        var idNode = document.getElementById('vote')
        idNode.innerHTML = `<i>Votes</i> ${question.votes}`

        var anchorNode = document.createElement('a')
        anchorNode.id = question.question_id.toString()
        anchorNode.href = "../UI/comments.html?questionid=" + question.question_id

    })
    

    questions.appendChild(questionNodes);

  } else if (data.Status === 404){
    document.getElementById('output').style.color = 'blue'
    document.getElementById('output').innerHTML = data.Message
    return message

  } 

})

}

// Post question
document.getElementById('post').addEventListener('submit', postQuestion)

function postQuestion(event){
  event.preventDefault();

  var id = location.search.split('meetupid=')[1];
  console.log(id);
  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/5/questions`;
  let token = window.localStorage.getItem('token');

  fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      "title": document.getElementById('title').value,
      "body": document.getElementById('body').value,
    }),
      headers : {
        'Access-Control-Request-Headers': '*',
        'Authorization': 'Bearer ' + token
      }
    })
  .then((res) => res.json())
  .then((data ) => {
    if (data.Status === 201){
      console.log(data);
      window.location.href = "../UI/questions.html?meetupid=" + id;

    } else if (data.Status === 404){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return message
    }
  })

}

document.getElementById('Upvote').addEventListener('click', upvote)
function upvote(){
  var id = this.getAttribute('meetupid');

  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/questions/5/upvote`

  let token = window.localStorage.getItem('token');
    
  fetch(url, {
    method : 'PATCH',
    headers : {
      'Access-Control-Request-Headers': '*',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((res) => res.json())
  .then((data ) => {
  if (data.Status === 201){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return Message
    }

  if (data.Status === 404){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return Message
    }
  })
}


document.getElementById('votedown').addEventListener('click', downvote)
function downvote(){
  var id = this.getAttribute('meetupid');

  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/questions/5/downvote`

  let token = window.localStorage.getItem('token');
    
  fetch(url, {
    method : 'PATCH',
    headers : {
      'Access-Control-Request-Headers': '*',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.Status === 201){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return Message
    }

  if (data.Status === 404){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return Message
    }
  })
}