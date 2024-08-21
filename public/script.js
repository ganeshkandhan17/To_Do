function formvalidate() {
    let input = document.querySelector("#input").value;
    if (input == "") {
        alert("Enter Task");
        return false
    }
}
function addtask(input, des, date, uid) {
    // let input = document.querySelector("#input").value;
    // let des = document.querySelector("#des").value;
    // let date = document.querySelector("#date").value;
    if (des == "") {
        des = "Not Mentioned"
    }
    if (!date == "") {
        date = date.split("T");
        var date1 = date[0]
        var time = date[1];
        var timehs = time.split(":");
        var hr = timehs[0];
        hr = parseInt(hr);
        var min = timehs[1];
        min = parseInt(min);
        var hrn = "AM";
        if (hr > 12) {
            hrn = "PM";
            hr = hr - 12;
        }
    }
    else {
        var hr = 0;
        var min = 0;
        var hrn = 0;
        date1 = "Not Mentioned"
    }

    if (input == "") {
        alert("Enter Task");
    } else {
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
        let detail = document.createElement("div");
        detail.className = "dtldiv";
        let dp = document.createElement("p");
        dp.className = "dtlp1";
        let dd = document.createElement("p");
        dd.className = "dtlp2";
        let dt = document.createElement("p");
        dt.className = "dtlp3";
        let ui = document.createElement("p");
        ui.className = "unid"
        dp.innerHTML = `<b>Description :</b> ${des}`;
        dd.innerHTML = `<b>Expiration Date :</b> ${date1}`;
        dt.innerHTML = `<b>Expiration Time : </b> ${hr} : ${min} ${hrn} `;
        ui.innerHTML = `<b>Id :</b> ${uid}`
        detail.appendChild(dp);
        detail.appendChild(dd);
        detail.appendChild(dt);
        detail.appendChild(ui);
        divnode.appendChild(detail);
    }
}
function addhistory(task, date) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = task;
    td2.innerHTML = getdateandtime(date);
    tr.appendChild(td1);
    tr.appendChild(td2);
    let table = document.querySelector(".tabody");
    table.appendChild(tr);
}
let amarkcomplete = () => alert('Mark Complete Successful')
let amarkuncomplete = () => alert('Marked Incomplete Successful')
let tasks = document.getElementById("tasks");
tasks.addEventListener("click", remove);
function remove(e) {
    if (e.target.tagName == "DIV") {
        let node = e.target.childNodes;
        if (node[0].src.includes("img/checked.png")) {
            node[0].src = "img/unchecked.png";
            node[1].style.textDecoration = "";
            let task = e.target.childNodes[1].innerHTML
            let temp = e.target.childNodes[3].lastChild.innerHTML; console.log(temp)
            let ui = getuid(temp)
            markuncomplete(task, ui)
        } else if (node[0].src.includes("img/unchecked.png")) {
            node[0].src = "img/checked.png";
            node[1].style.textDecoration = "line-through";
            let task = e.target.childNodes[1].innerHTML;
            let temp = e.target.childNodes[3].lastChild.innerHTML;
            let ui = getuid(temp)
            markcomplete(task, ui)
        }
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.classList.add("active");
        let task = e.target.previousSibling.innerHTML;
        let temp = e.target.nextSibling.childNodes[3].innerHTML;
        let ui = getuid(temp)
        delettask(task, ui)
        setTimeout(function () {
            e.target.parentElement.remove();
        }, 250);
    } else if (e.target.tagName == "IMG") {
        let btn = e.target;
        let tt = e.target.nextSibling;
        let task = tt.innerHTML;
        let parent = e.target.parentElement;
        let temp = parent.childNodes[3].lastChild.innerHTML;
        let ui = getuid(temp)
        if (btn.src.includes("img/checked.png")) {
            btn.src = "img/unchecked.png";
            tt.style.textDecoration = "";
            markuncomplete(task, ui)
        } else if (btn.src.includes("img/unchecked.png")) {
            btn.src = "img/checked.png";
            tt.style.textDecoration = "line-through";
            markcomplete(task, ui)
        }
    } else if (e.target.tagName == "P") {
        let btn = e.target.previousSibling;
        let tt = e.target;
        let task = tt.innerHTML;
        let parent = e.target.parentElement;
        let temp = parent.childNodes[3].lastChild.innerHTML;
        let ui = getuid(temp)
        if (btn.src.includes("img/checked.png")) {
            btn.src = "img/unchecked.png";
            tt.style.textDecoration = "";
            markuncomplete(task, ui);
        } else if (btn.src.includes("img/unchecked.png")) {
            btn.src = "img/checked.png";
            tt.style.textDecoration = "line-through";
            markcomplete(task, ui);
        }
    }
}
function getuid(temp) {
    temp = temp.split(" ")
    return temp[2];
}
document.querySelector(".seaimg").addEventListener("click", () => {
    let seain = document.querySelector(".seain");
    if (seain.value == "") {
        seain.classList.toggle("active");
    } else {
    }
});
let logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
    document.querySelector(".prodrp").classList.toggle("active");
});

let taskin = document.querySelector(".taskinput");
taskin.addEventListener("focus", (e) => {
    document.querySelector("#des").removeAttribute("hidden");
    document.querySelector("#date").removeAttribute("hidden");
});

taskin.addEventListener("blur", (e) => {
    if (taskin.value == "") {
        document.querySelector("#des").setAttribute("hidden", "");
        document.querySelector("#date").setAttribute("hidden", "");
    }
});
function gettime() {
    let date1 = new Date();
    date1 = date1.toString().split(' ');
    let time = date1[4].split(':');
    let tn = "AM";
    if (time[0] > 12) {
        time[0] = time[0] - 12;
        tn = "PM"
    }
    let realtime = `${time[0]} : ${time[1]} ${tn}`;
    return realtime;
}
function getdateandtime(date) {
    let date2 = date.toString().split('T')
    let hrn = "AM"
    let date3 = date2[0];
    let time1 = date2[1];
    time1 = time1.split(":");
    let hr = parseInt(time1[0])
    let min = parseInt(time1[1])
    if (hr > 12) {
        hr = hr - 12
        hrn = "PM"
    }
    return `${date3} / ${hr}:${min} ${hrn}`
}
function getrealdateandtime() {
    let currentTimeUTC = new Date();
    let currentTimeIST = new Date(currentTimeUTC.getTime() + 5.5 * 60 * 60 * 1000);
    let realdate = currentTimeIST.toISOString();
    realdate = realdate.split('.')
    realdate = realdate[0].split(':');
    realdate = `${realdate[0]}:${realdate[1]}`
    return realdate
}
document.querySelector('#date').setAttribute('min', getrealdateandtime())
let refbtn = document.querySelector('.refbtn');
refbtn.addEventListener('click', () => {
    document.querySelector('.reficn').classList.toggle('active');
})
async function gettasks(email) {
    let url = "/gettasks"
    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then((result) => result.json())
        .then((data) => {
            data.forEach(el => {
                addtask(el.task, el.description, el.expDate, el._id)
            });
        })
}
async function gethistory(email) {
    let url = "/gethistory"
    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
        .then((result) => result.json())
        .then((data) => {
            data.forEach(el => {
                addhistory(el.task, el.compDate)
            })
        })
}
async function refreshdata() {
    let email = document.querySelector(".Mail").innerHTML
    removealltasks()
    removeallhistory()
    gettasks(email)
    gethistory(email)
}
let seabtn = document.querySelector('.seaimg');
let seain = document.querySelector('.seain')
seabtn.addEventListener('click', search)
async function search() {
    let query = document.querySelector('.seain').value;
    let email = document.querySelector(".Mail").innerHTML;
    if (query) {
        let url = '/search'
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query: query, email: email })
        })
            .then((data) => data.json())
            .then((result) => {
                removealltasks()
                let count=0;
                result.forEach((data1) => {
                    temptask = data1.task.toLowerCase();
                    if (temptask.includes(query.toLowerCase())&&data1.completed==0) {
                        count++;
                        addtask(data1.task, data1.description, data1.expDate, data1._id)
                    }
                })
                if(count==0){
                    alert("Task Not Found")
                    refreshdata()
                }
            })
    }
}
function removealltasks() {
    let tasks = document.querySelector(".tasks");
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }
}
function removeallhistory() {
    let tbody = document.querySelector(".tabody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}
async function markcomplete(task, ui) {
    let email = document.querySelector(".Mail").innerHTML
    date = getrealdateandtime()
    await fetch('/markcomplete', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, task: task, date: date, ui: ui })
    })
        .then((data => data.json()))
        .then((result) => {
            if (result.status == "success") {
                amarkcomplete()
            }
            else {
                alert("Error Occurs in mark Complete")
            }
        })
        .catch((err) => {
            alert("Error Occurs at Marking Complete" + err);
        })
}
async function markuncomplete(task,ui) {
    let email = document.querySelector(".Mail").innerHTML
    await fetch('/markuncomplete', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, task: task,ui : ui })
    })
        .then((data => data.json()))
        .then((result) => {
            if (result.status == "success") {
                amarkuncomplete()
            }
            else {
                alert("Error Occurs in mark Incomplete")
            }
        })
        .catch((err) => {
            alert("Error Occurs at Marking Complete" + err);
        })
}
async function delettask(task, ui) {
    let email = document.querySelector(".Mail").innerHTML;
    console.log(email)
    console.log(task)
    await fetch('/delettask', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, task: task, ui: ui })
    })
        .then((data) => data.json())
        .then((result) => {
            if (result.status == "success") {
                alert("Task Deleted Successful")
            }
            else {
                alert("Task Delete Failed");
            }
        })
}
seain=document.querySelector('.seain')
seain.addEventListener('keydown',(e)=>{
    if(e.code=="Enter"){
        search();
    }
})