//dice modal
var diceModal = document.getElementById("dice-modal"); 

var img = document.getElementById("dice-modal-img"); 
var modalImg = document.getElementById("img01"); 
var captionText = document.getElementById("caption"); 
img.onclick = function(){
    diceModal.style.display = "block"; 
    modalImg.src = this.src; 
    captionText.innerHTML = this.alt;
}

var span = document.getElementsByClassName("close")[0]; 

span.onclick = function(){
    diceModal.style.display = "none"; 
}
