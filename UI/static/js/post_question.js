// Post question
document.getElementById('post').addEventListener('click', postQuestion)

function postQuestion(e){
    e.preventDefault();

  var id = location.search.split('meetupid=')[1];
  console.log(id);
  let posturl = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/meetups/${id}/questions`;
  let token = window.localStorage.getItem('token');
  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;

  data = {
    "title": title,
    "body": body
  }
    fetch(posturl, {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((data ) => {
    if (data.Status === 201){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return Message

    } else if (data.Status === 404){
      document.getElementById('output').style.color = 'blue'
      document.getElementById('output').innerHTML = data.Message
      return Message
    }
  })

}