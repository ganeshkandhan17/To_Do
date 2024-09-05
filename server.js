let express = require('express');
let { v4 } = require('uuid')
let path = require('path');
let db = require('./db');
let bodyParser = require('body-parser');
let date = require('date-fns');
let mongoose = require('mongoose');
let { welcomeemail, remainder, forgetpassword } = require('./mailer')
let timer = require('node-cron')
let ejs = require('ejs');
let app = express();
let port = 3001;
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
require("dotenv").config();
db()
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
let registerScema = new mongoose.Schema({
    name: String,
    emailid: String,
    password: String
})
let register = mongoose.model("UserData", registerScema)
let taskScema = new mongoose.Schema({
    emailid: String,
    task: String,
    description: String,
    date: String,
    expDate: String,
    compDate: String,
    completed: Number,
})
headtask = mongoose.model("Task", taskScema)
app.post('/register', (req, res) => {
    let getname = req.body.name
    let getemailid = req.body.emailid;
    let getpassword = req.body.password;
    let existcheck = register.find({ emailid: getemailid });
    existcheck.then((result) => {
        let length1 = result.length;
        if (length1 == 0) {
            let registered = new register({
                'name': getname,
                'emailid': getemailid,
                'password': getpassword
            });
            registered.save()
                .then(() => {
                    welcomeemail(getemailid)
                    console.log('Data added to Database');
                    res.send("<script>alert('Account Created Successful');window.location.href = 'login.html';</script>")
                })
                .catch((err) => {
                    console.log("error occurs in data adding to database")
                });
        } else {
            res.send("<script>alert('Account already exists with this mailid');window.location.href='signup.html'</script>");
        }
    });
})
app.post('/login', (req, res) => {
    let getmailid = req.body.emailid
    let getpassword = req.body.password;
    register.find({ emailid: getmailid, password: getpassword })
        .then((result) => {
            length1 = result.length;
            let loginedname = "";
            let loginedemailid = "";
            if (length1 == 0) {
                res.send("<script>alert('Invalid Email Id or Password');window.location.href='login.html'</script>")
            }
            else {
                loginedname = result[0].name;
                loginedemailid = result[0].emailid
                headtask.find({ emailid: loginedemailid })
                    .then((data) => {
                        res.render(path.join(__dirname, 'main.html'),
                            {
                                name: loginedname,
                                emailid: loginedemailid
                            })
                        console.log('Login Successful')
                    });
            }
        })
        .catch((err) => {
            console.log("Error Occurs in Login" + err);
            res.send('<script>alert("Error Occurs in Login");window.location.href="login.html"</script>')
        })
})
app.post('/addtask', (req, res) => {
    let task = req.body.task
    let description = req.body.description;
    let emailid = req.body.email
    let expdate = req.body.date;
    let loginedname = req.body.name;
    let loginedemailid = emailid
    newtask = new headtask(
        {
            emailid: emailid,
            task: task,
            description: description,
            expDate: expdate,
            compDate: 0,
            completed: 0
        })
    newtask.save()
        .then(() => {
            console.log("Task Added");
        })
        .catch((err) => {
            console.log("Error Occurs in adding task to database = " + err)
        })
    res.render(path.join(__dirname, 'main.html'),
        {
            name: loginedname,
            emailid: loginedemailid
        })
})
app.post('/gettasks', (req, res) => {
    let email = req.body.email;
    headtask.find({ emailid: email, completed: 0 })
        .then((result) => {
            res.json(result)
        })
})
app.post('/gethistory', (req, res) => {
    let email = req.body.email;
    headtask.find({ emailid: email, completed: 1 })
        .then((result) => {
            res.json(result)
        })
})
app.post('/markcomplete', (req, res) => {
    let email = req.body.email;
    let task = req.body.task;
    let date = req.body.date
    let ui = req.body.ui
    headtask.updateOne({ emailid: email, task: task, _id: ui }, { completed: 1, compDate: date })
        .then((data) => {
            console.log('Mark Completed Successful')
            res.json({ status: "success" });
        })
        .catch((err) => {
            console.log('Error Occurs' + err)
            res.json({ status: "fail" });
        })
})
app.post('/markuncomplete', (req, res) => {
    let email = req.body.email;
    let task = req.body.task;
    let ui = req.body.ui;
    headtask.updateOne({ emailid: email, task: task, _id: ui }, { completed: 0 })
        .then((data) => {
            if(data.modifiedCount==1){
                console.log("Mark inComplete Sucessful");
            res.json({ status: "success" });
            }
        })
        .catch((err) => {
            console.log("Error Occus in Mark incomplete" + err);
            res.json({ status: "fail" });
        })
})
app.post('/delettask', (req, res) => {
    let email = req.body.email;
    let task = req.body.task;
    let ui = req.body.ui;
    headtask.deleteOne({ emailid: email, task: task, _id: ui })
        .then((data) => {
            if (data.deletedCount == 1) {
                res.json({ status: "success" });
                console.log("Deleted Successful")
            }
            else {
                console.log('Error Occurs');
            }
        })
        .catch((err) => {
            console.log('Error Occurs ' + err);
            res.json({ status: 'failed' })
        })
})

app.post('/search', (req, res) => {
    let query = req.body.query;
    let email = req.body.email;
    headtask.find({ emailid: email })
        .then((data) => {
            res.json(data);
        })
})
timer.schedule('* * * * *', () => {
    let RY = date.format(new Date(), `yyyy`)
    let RM = date.format(new Date(), `MM`)
    let RD = date.format(new Date(), `dd`)
    let Rh = date.format(new Date(), `HH`)
    let Rm = date.format(new Date(), `mm`)
    headtask.find()
        .then((data) => {
            data.forEach((task) => {
                if (task.expDate != "") {
                    let tempdat = task.expDate
                    tempdat = tempdat.split('T');
                    let tempd = tempdat[0];
                    let tempt = tempdat[1];
                    tempt = tempt.split(':');
                    let tempH = tempt[0];
                    let tempMM = tempt[1];
                    tempd = tempd.split('-')
                    let tempY = tempd[0];
                    let tempM = tempd[1];
                    let tempD = tempd[2];
                    let dif = date.differenceInMinutes((new Date(RY, RM, RD, Rh, Rm)), (new Date(tempY, tempM, tempD, tempH, tempMM)))
                    if (dif == -5) {
                        remainder(task.emailid, task.task, task.expDate)
                    }

                }
            })
        })

})
app.post('/forgetpass', (req, res) => {
    let forgetmail = req.body.emailid;
    let uuid = v4();
    let temppass = uuid.slice(0, 8);
    register.updateOne({ emailid: forgetmail }, { password: temppass })
        .then((res) => {
            console.log('Password Change Successful')
        })
        .catch((err) => {
            console.log('Error Occurs at Password Changes' + err);
        })
    forgetpassword(forgetmail, temppass)
    res.send('<script>alert("Instructions Send to the Registered EmailId");window.location.href="login.html"</script>')
})
app.post('/changepassword', (req, res) => {
    let currentpassword = req.body.currentpassword;
    let email = req.body.emailid;
    let newpassword = req.body.password;
    register.find({ emailid: email })
        .then((data) => {
            let oldpassword = data[0].password;
            if (oldpassword == currentpassword) {
                register.updateOne({ emailid: email }, { password: newpassword })
                    .then((data) => {
                        if (data.modifiedCount == 1) {
                            res.send(`<script>alert('Password Changed Successful');window.location.href="login.html"</script>`)
                        }

                    })
            }
            else{
                res.send(`<script>alert('Current Password was Incorrect');window.location.href="changepassword.html"</script>`)
            }
        })
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

process.on("uncaughtException",(err)=>{
    console.error("Error Occcurs"+err);
})