// fetch("https://discord.com/api/v10/oauth2/token?grant_type=authorization_code&code=Yxz0AcVPBwFSKsAV3yoRFB0hqPUhgi&redirect_uri=http://127.0.0.1:5501?login_type=discord&code=MIYJSOFo1vH7KdrOPI6LiStOAzqPk8", {
//   method: 'post',
// 	headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bot MTIwNjYyMDk0NDA2NDMyMzYxNA.GJfp3s.t3sKKH7QA_pwRvXj0j3pHmfP9VyMkTh6W-8MR4'
  
//   },

// }).then(async test  =>{
//   const data = await test.json();

//   console.log(data)
// })



const express = require('express');
const app = express();

const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "db/3bla.sqlite" });

app.use(express.json());

// db.push("userInfo2.test3", "test").then(async test => {
//   const test2 = await db.get("userInfo2.test");
//   console.log(test2.test.test2);
// });

app.post('/dkan3bla/login', async (req, res) => {
  let body = req.body;

  if (!body || body.ip == null || body.ip == undefined) {
    return res.status(400).json({ error: 'ip undefined' });
  }
  if (!body || body.token == null || body.token == undefined) {
    return res.status(400).json({ error: 'token undefined' });
  }
  if (!body || body.type == null || body.type == undefined) {
    return res.status(400).json({ error: 'type undefined' });
  }
  if (!body || body.mail == null || body.mail == undefined) {
    return res.status(400).json({ error: 'mail undefined' });
  }
  if (!body || body.pass == null || body.pass == undefined) {
    return res.status(400).json({ error: 'mail undefined' });
  }

  let ip = body.ip.replace(/\./g, "");
  const userInfo = await db.get(`ip-${ip}`).catch(err => {if(err)return  res.send(err);})
console.log(userInfo)
  if(!userInfo){
      let user = {
    "ip": ip,
    "token": body.token,
    "type":  body.type,
    "mail": body.mail,
  }
  db.set(`ip-${ip}`, user).catch(err => {if(err)return  res.send(err);})
  res.send('done login');
  }else {
  res.send('you login alredy');
    
  }

});

app.post('/dkan3bla/checklogin', async (req, res) => {
  let body = req.body;

  if (!body || body.ip == null || body.ip == undefined) {
    return res.status(400).json({ error: 'ip undefined' });
  }
  let ip = body.ip.replace(/\./g, "");
  const userInfo = await db.get(`ip-${ip}`).catch(err => {if(err)return  res.send(err);})
console.log(userInfo)
  if(!userInfo){
    return res.json({ status: false });

  }else {
    return res.json({ status: true });
    
  }

});


app.delete('/dkan3bla/logout', (req, res) => {
  let body = req.body;

  if (!body || body.ip == null || body.ip == undefined) {
    return res.status(400).json({ error: 'ip undefined' });
  }

  let ip = body.ip.replace(/\./g, "");
 
   db.delete(`ip-${ip}`).catch(err => {if(err)return  res.send(err);})

  res.send('done logout');


});

app.listen(3000);
