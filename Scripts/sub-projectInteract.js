//dice modal
var diceModal = document.getElementById("dice-modal"); 

var diceImg = document.getElementById("dice-modal-img"); 
var diceModalImg = document.getElementById("diceImg1"); 

diceImg.onclick = function(){
    diceModal.style.display = "block"; 
    diceModalImg.src = this.src; 
}

var diceSpan = document.getElementsByClassName("close")[0]; 

diceSpan.onclick = function(){
    diceModal.style.display = "none"; 
}

//paint box modal
var paintModal = document.getElementById("paint-modal"); 

var paintImg = document.getElementById("paint-modal-img"); 
var paintModalImg = document.getElementById("paintImg1"); 

paintImg.onclick = function(){
    paintModal.style.display = "block"; 
    paintModalImg.src = this.src; 
}

var paintSpan = document.getElementsByClassName("close")[0]; 

paintSpan.onclick = function(){
    paintModal.style.display = "none"; 
}






document.onkeydown = function(evt){
    evt = evt || window.event; 
    var isEscape = false; 
    if("key" in evt){
        isEscape = (evt.key === "Escape" || evt.key === "Esc"); 
    }else{
        isEscape = (evt.keyCode === 27); 
    }
    if(isEscape){
        diceModal.style.display = "none"; 
        paintModal.style.display = "none"; 
    }
}

window.onclick = function(event){
    if (event.target == diceModal){
        diceModal.style.display = "none"; 
    }
    if (event.target == paintModal){
        paintModal.style.display = "none"; 
    }
}
