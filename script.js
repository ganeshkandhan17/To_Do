function addtask() {
    let input = document.querySelector("#input").value;
    let des = document.querySelector("#des").value;
    let date = document.querySelector('#date').value
    date = date.split("T");
    let time = date[1];
    let timehs = time.split(":");
    console.log(timehs);
    let hr = timehs[0];
    console.log(hr);
    hr = parseInt(hr);
    let hrn = "AM"
    if (hr > 12) {
        hrn = "PM";
        hr = hr - 12;
    }
    if (input == "") {
        alert("Enter Task");
    }
    else {
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
        document.querySelector("#des").value = "";
        document.querySelector("#date").value = "";
        let detail = document.createElement("div");
        detail.className = "dtldiv";
        let dp = document.createElement("p");
        dp.className = "dtlp1";
        let dd = document.createElement("p");
        dd.className = "dtlp2"
        let dt = document.createElement("p");
        dt.className = "dtlp3";
        dp.innerHTML = `<b>Description :</b> ${des}`;
        dd.innerHTML = `<b>Expiration Date :</b> ${date[0]}`;
        dt.innerHTML = `<b>Expiration Time : </b> ${hr} : ${timehs[1]} ${hrn} `;
        console.log(detail);
        detail.appendChild(dp);
        detail.appendChild(dd);
        detail.appendChild(dt);
        divnode.appendChild(detail);
    }
}
let tasks = document.getElementById("tasks");
tasks.addEventListener("click", remove);
function remove(e) {
    if (e.target.tagName == "DIV") {
        let node = e.target.childNodes;
        if (node[0].src.includes("img/checked.png")) {
            node[0].src = "img/unchecked.png";
            node[1].style.textDecoration = "";
        }
        else if (node[0].src.includes("img/unchecked.png")) {
            node[0].src = "img/checked.png";
            node[1].style.textDecoration = "line-through";
        }
    }
    else if (e.target.tagName == "SPAN") {
        e.target.parentElement.classList.add("active");
        setTimeout(function () {
            e.target.parentElement.remove();
        }, 250);
    }
    else if (e.target.tagName == "IMG") {
        let btn = e.target;
        let tt = e.target.nextSibling;
        if (btn.src.includes("img/checked.png")) {
            btn.src = "img/unchecked.png";
            tt.style.textDecoration = "";
        }
        else if (btn.src.includes("img/unchecked.png")) {
            btn.src = "img/checked.png";
            tt.style.textDecoration = "line-through";
        }
    }
    else if (e.target.tagName == "P") {
        let btn = e.target.previousSibling;
        let tt = e.target;
        if (btn.src.includes("img/checked.png")) {
            btn.src = "img/unchecked.png";
            tt.style.textDecoration = "";
        }
        else if (btn.src.includes("img/unchecked.png")) {
            btn.src = "img/checked.png";
            tt.style.textDecoration = "line-through";
        }
    }
    let linode = e.target.childNodes;
    console.log(linode)
    let task = linode[1].innerHTML;
    console.log(task)
    let date = linode[3].childNodes[1].innerHTML;
    date = date.split("</b>");
    date = date[1];
    console.log(date)
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = task;
    td2.innerHTML = date;
    console.log(td1, td2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    console.log(tr);
    let table = document.querySelector(".table");
    table.appendChild(tr);
}
document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        addtask();
    }
});
document.querySelector(".seaimg").addEventListener('click', () => {
    let seain = document.querySelector('.seain');
    if(seain.value==""){
        seain.classList.toggle('active');
    }
    else{

    }
    
});
let logout = document.querySelector(".logout");
logout.addEventListener('click', () => {
    document.querySelector('.prodrp').classList.toggle('active');
})

let taskin = document.querySelector('.taskinput');
taskin.addEventListener('focus', (e) => {
    document.querySelector('#des').removeAttribute("hidden");
    document.querySelector('#date').removeAttribute("hidden");
})

taskin.addEventListener('blur', (e) => {
    if (taskin.value == "") {
        document.querySelector('#des').setAttribute("hidden", "");
        document.querySelector('#date').setAttribute("hidden", "");
    }
});