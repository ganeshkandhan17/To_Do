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
        document.querySelector(".tasks").prepend(divnode);
        document.querySelector("#input").value = "";
    }
}
let tasks = document.getElementById("tasks");
tasks.addEventListener("click",function(e){
    if(e.target.tagName=="DIV"){
        let node=e.target.childNodes;
        if(node[0].src.includes("img/checked.png")){
            node[0].src="img/unchecked.png";
            node[1].style.textDecoration="";
        }
        else if(node[0].src.includes("img/unchecked.png")){
            node[0].src="img/checked.png";
            node[1].style.textDecoration="line-through";
        }
    }
    else if(e.target.tagName=="SPAN"){
        e.target.parentElement.classList.add("active");
        setTimeout(function(){
            e.target.parentElement.remove();
        },250);
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

// let span=document.querySelector(".close");
// span.addEventListener("click",function(){
//     let layover=document.querySelector(".layover");
//         layover.classList.add("hide");
//         setTimeout(function(){
//             layover.remove();
//         },600);
// });

document.getElementById("input").addEventListener("keydown",function(e){
    if(e.code=="Enter"){
        addtask();
    }
});
document.querySelector(".seaimg").addEventListener('click',()=>{
    let seain=document.querySelector('.seain');
    seain.classList.toggle('active');
});
let logout=document.querySelector(".logout");
logout.addEventListener('click',()=>{
    document.querySelector('.prodrp').classList.toggle('active');
})

let taskin=document.querySelector('.taskinput');
taskin.addEventListener('focus',(e)=>{
    document.querySelector('#des').removeAttribute("hidden");
    document.querySelector('#date').removeAttribute("hidden");
})

taskin.addEventListener('blur', (e) => {
    document.querySelector('#des').setAttribute("hidden", "");
    document.querySelector('#date').setAttribute("hidden", "");
});