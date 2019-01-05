var modal = document.getElementById('myicon');

var icon = document.getElementById("icon");

var span = document.getElementsByClassName("close")[0];
 
icon.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}