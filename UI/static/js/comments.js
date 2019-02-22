 // display all available comments
 fetchComments()

 function fetchComments(){
    let id = location.search.split('questionid=')[1];
    console.log(id);
    let url = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/questions/${id}/comments`;
    let token = window.localStorage.getItem('token');
    let comments = document.getElementById('comment');
 
   fetch(url, {
     method : 'GET',
     headers : {
       'Access-Control-Request-Headers': '*',
       'Authorization': 'Bearer ' + token
     }
   })
   .then((res) => res.json())
   .then((data) => {
       if (data.Status === 404) {
           // if request is unsuccessful
           document.getElementById('output').style.color = 'blue'
           document.getElementById('output').innerHTML = data.Message
           return Message
       }
       if (data.Status === 200) {
           // if request is successful
           return data.data.forEach(function(comm) { 
               comments.innerHTML += `
               <p><b>Comment: </b>${comm.comment_id}</p>
               <p>${comm.comment}</p>
               <p><i>Posted By: </i>${comm.user_id}</p>
               <p><i>TimePosted: </i>${comm.time_added}</p>
           </div>
               `;
           })

       }
   })
}

// Post comment
postComment = () => {
    var id = location.search.split('questionid=')[1];
    let comment = document.getElementById('conn').value;
    let posturl = `https://my-postgres-questioner-v2-api.herokuapp.com/api/v2/questions/${id}/comments`;
    let token = window.localStorage.getItem('token');


    data = {
        "comment": comment,
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
        .then((data) => {
            if (data.Status === 404){
                alert(data.Message)
                }
            if (data.Status === 201){
                alert(data.Message)
                }

        })

}
