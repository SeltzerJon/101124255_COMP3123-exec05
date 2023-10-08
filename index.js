const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
// var user = require('./user.json');
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});0
/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
          res.status(500).send({ error: 'Failed to read the user.json' });
          return;
      }
      res.json(JSON.parse(data));
  });
});
/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
app.get('/login', (req,res) => {
    const userName = req.query.username;
    const password = req.query.password;
    fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
      }
      try {
       
        const userInfo = JSON.parse(data);
  
        
        if (userInfo.username === userName && userInfo.password === password) {
         
          res.json({ status: true, message: 'User Is valid' });
        } else if (userInfo.username !== userName) {
        
          res.json({ status: false, message: 'User Name is invalid' });
        } else {
         
          res.json({ status: false, message: 'Password is invalid' });
        }
      } catch (parseError) {
        console.error(parseError);
        res.status(500).json({ status: false, message: 'JSON Parsing Error' });
      }
    });
  });
/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
app.get('/logout/:username', (req,res) => {
    const username = req.params.username;
   
    const message = `<b>${username} successfully logged out.</b>`;
  
    res.send(message);
    
  });
  
  app.use('/', router);
  
  app.listen(process.env.port || 8081);
  
  console.log('Web Server is listening at port '+ (process.env.port || 8081));