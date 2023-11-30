function addtask(){
    let input = document.querySelector("#input").value;
    if(input == ""){
        alert("Enter Task");
    }
    else{
        let divnode = document.createElement("div");
        divnode.className = "tasksli";
        let img = document.createElement("img");
        divnode.appendChild(img);
        img.className = "statusbutton";
        img.src = "img/unchecked.png";
        let p = document.createElement("p");
        p.className = "taskcontent";
        p.innerHTML = input;
        divnode.appendChild(p);
        let span = document.createElement("span");
        span.innerHTML = "⛌";
        divnode.appendChild(span);
        document.querySelector(".tasks").appendChild(divnode);
        document.querySelector("#input").value = "";
    }
}
window.onload = function() {
let tasks = document.getElementById("tasks");
tasks.addEventListener("click",function(e){
    if(e.target.tagName=="SPAN"){
        e.target.parentElement.remove();
    }
    else if(e.target.tagName=="IMG"){
        let btn=e.target;
        let tt=e.target.nextSibling;
        if(btn.src.includes("img/checked.png")){
            btn.src="img/unchecked.png"; 
            tt.style.textDecoration="";
        }
        else if(btn.src.includes("img/unchecked.png")){
            btn.src="img/checked.png";
            tt.style.textDecoration="line-through";
        }  
    }
    else if(e.target.tagName=="P"){
        let btn=e.target.previousSibling;
        let tt=e.target;
        if(btn.src.includes("img/checked.png")){
            btn.src="img/unchecked.png"; 
            tt.style.textDecoration="";
        }
        else if(btn.src.includes("img/unchecked.png")){
            btn.src="img/checked.png";
            tt.style.textDecoration="line-through";
        }
    }  
});
}