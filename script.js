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
    console.log(hr / 2);
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
        dp.innerHTML = `<b>Description :</b> ${des}`;
        dd.innerHTML = `<b>Expiration Date :</b> ${date}`;
        console.log(detail);
        detail.appendChild(dp);
        detail.appendChild(dd);
        divnode.appendChild(detail);
    }
}
let tasks = document.getElementById("tasks");
tasks.addEventListener("click", function (e) {
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
});
document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        addtask();
    }
});
document.querySelector(".seaimg").addEventListener('click', () => {
    let seain = document.querySelector('.seain');
    seain.classList.toggle('active');
});
let logout = document.querySelector(".logout");
logout.addEventListener('click', () => {
    document.querySelector('.prodrp').classList.toggle('active');
})

let taskin = document.querySelector('.taskinput');
taskin.addEventListener('focus', (e) => {
    console.log("1")
    document.querySelector('#des').removeAttribute("hidden");
    document.querySelector('#date').removeAttribute("hidden");
    console.log("2")
})

taskin.addEventListener('blur', (e) => {
    console.log("3")
    if (taskin.value == "") {
        document.querySelector('#des').setAttribute("hidden", "");
        document.querySelector('#date').setAttribute("hidden", "");
    }
});