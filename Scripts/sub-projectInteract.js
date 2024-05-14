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

var paintSpan = document.getElementsByClassName("close")[1]; 

paintSpan.onclick = function(){
    paintModal.style.display = "none"; 
}

//XLift modal
var xliftModal = document.getElementById("xlift-modal"); 

var xliftImg = document.getElementById("xlift-modal-img"); 
var xliftModalImg = document.getElementById("xliftImg1"); 

xliftImg.onclick = function(){
    xliftModal.style.display = "block"; 
    xliftModalImg.src = this.src; 
}

var xliftSpan = document.getElementsByClassName("close")[2]; 

xliftSpan.onclick = function(){
    xliftModal.style.display = "none"; 
}

//Table modal
var tableModal = document.getElementById("table-modal"); 

var tableImg = document.getElementById("table-modal-img"); 
var tableModalImg = document.getElementById("tableImg1"); 

tableImg.onclick = function(){
    tableModal.style.display = "block"; 
    tableModalImg.src = this.src; 
}

var tableSpan = document.getElementsByClassName("close")[3]; 

tableSpan.onclick = function(){
    tableModal.style.display = "none"; 
}

//Conch modal
var conchModal = document.getElementById("conch-modal"); 

var conchImg = document.getElementById("conch-modal-img"); 
var conchModalImg = document.getElementById("conchImg1"); 

conchImg.onclick = function(){
    conchModal.style.display = "block"; 
    conchModalImg.src = this.src; 
}

var conchSpan = document.getElementsByClassName("close")[4]; 

conchSpan.onclick = function(){
    conchModal.style.display = "none"; 
}

//Charlie modal
var charlieModal = document.getElementById("charlie-modal"); 

var charlieImg = document.getElementById("charlie-modal-img"); 
var charlieModalImg = document.getElementById("charlieImg1"); 

// charlieImg.onclick = function(){
//     charlieModal.style.display = "block"; 
//     charlieModalImg.src = this.src; 
// }

// var charlieSpan = document.getElementsByClassName("close")[0]; 

// charlieSpan.onclick = function(){
//     charlieModal.style.display = "none"; 
// }





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
        xliftModal.style.display = "none"; 
        tableModal.style.display = "none";
        conchModal.style.display = "none"; 

        charlieModal.style.display = "none";
    }
}

window.onclick = function(event){
    if (event.target == diceModal){
        diceModal.style.display = "none"; 
    }
    if (event.target == paintModal){
        paintModal.style.display = "none"; 
    }
    if (event.target == xliftModal){
        xliftModal.style.display = "none"; 
    }
    if (event.target == tableModal){
        tableModal.style.display = "none"; 
    }
    if (event.target == conchModal){
        conchModal.style.display = "none"; 
    }

    if (event.target == charlieModal){
        charlieModal.style.display = "none"; 
    }
}
