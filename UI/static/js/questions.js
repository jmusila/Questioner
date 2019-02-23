// Get top questions
function stashId(inid) {
  sessionStorage.setItem('questionid', inid)
}

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

        var topicNode = document.createElement('h2')
        topicNode.id = 'qsn_id'
        topicNode.innerHTML = `<i>Question</i> ${question.question_id}`

        var titleNode = document.createElement('p')
        titleNode.id = 'solution'
        titleNode.innerHTML = `<b>Title</b> ${question.title}`

        var bodyNode = document.createElement('p')
        bodyNode.id = 'body'
        bodyNode.innerHTML = `${question.body}`

        var voteNode = document.createElement('h4')
        voteNode.id = 'vote'
        voteNode.innerHTML = `<i>Votes</i> ${question.votes}`

        var userNode = document.createElement('p')
        userNode.id = 'user'
        userNode.innerHTML = `<i>Posted By:</i> ${question.username}`

        var viewNode = document.createElement('p')
        viewNode.innerHTML = `<b>View Comments</b>`


        var anchorNode = document.createElement('a')
        anchorNode.id = question.question_id.toString()
        anchorNode.href = `../UI/comments.html?meetupid=${id}/questionid=${question.question_id}`;

        anchorNode.appendChild(topicNode)
        anchorNode.appendChild(titleNode)
        anchorNode.appendChild(bodyNode)
        anchorNode.appendChild(voteNode)
        anchorNode.appendChild(userNode)
        anchorNode.appendChild(viewNode)


        questions.appendChild(anchorNode)

        var commentNode = document.createElement('div')
        commentNode.className = 'upvote'
        var commNode = document.createElement('div')
        commNode.id = 'upvote'

        var iconNode = document.createElement('i')
        iconNode.className = 'fa fa-comment'
        questions.innerHTML += `
        <table>
          <tr>
          </tr>
            <tr>
              <td>
                <div class="upvote">
                  <i onclick="stashId(${question.question_id}); upvote();" class="fa fa-thumbs-up"></i></div>
              </td>
              <td>

              </td>
              <td>
              <div class="downvote">
                <i onclick="stashId(${question.question_id}); downvote();" class="fa fa-thumbs-down"></i></div>
              </div>
            </td>
          </tr>
        </table>
        `;

    })
    questions.appendChild(questionNodes);

  } else if (data.Status === 404){
    document.getElementById('output').style.color = 'blue'
    document.getElementById('output').innerHTML = data.Message
    return Message

  } 

})

}


function upvote(){
  let questionId = sessionStorage.getItem('questionid');
  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/questions/${questionId}/upvote`

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
      alert(data.Message)
      }

  if (data.Status === 404){
    alert(data.Message)
    }
    if (data.status === 401) {
      alert(data.message)
  }
  })
}


function downvote(){

  let questionId = sessionStorage.getItem('questionid');
  let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/questions/${questionId}/downvote`

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
      alert(data.Message)
      }

      if (data.Status === 404){
        alert(data.Message)
        }
    if (data.Status === 401) {
      alert(data.Message)
  }
  })
}