const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000, () => {
    console.log('Access via localhost');
    console.log('Listening to port 3000');
});

app.use(express.static('public/css'));
app.use(express.static('public/html'));
app.use(express.static('public/js'));
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/chat', (req, res) => {
    if (req.body.name && req.body.message) {
        let line = `${req.body.name};${req.body.message}\n`;
        fs.appendFile('public/data/chat.csv', line, 'utf8', (err) => {
            if (err) throw err;
            console.log('@file chat.csv: new data added.');

            fs.readFile(`public/html/chat_confirm.html`, 'utf8', (err, data) => {
                if (err) throw err;
                res.send(data);
            });
        });
    }
});

app.get('/chat', (req, res) => {
    const data = fs.readFile('./public/data/chat.csv', 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Sorry, no messages stored.');
            console.log(err);
        }  else {
            let names = [];
            let messages = [];
            let lines = data.split('\n');

            for (let i = lines.length - 1; i >= 0; i--){
                let elements = lines[i].split(';');
                if (elements[1] !== undefined) {
                    names.push(elements[0]);
                    messages.push(elements[1]);
                }
            }
            let obj = {"names": names, "messages": messages};
            res.send(JSON.stringify(obj));
        }
    });
});

app.get('/chat/:id', (req, res) => {
    const data = fs.readFile('public/data/chat.csv', 'utf8', (err, data) => {
       if (err) {
           res.status(404).send('Sorry no messages stored.');
       } else {
           let lines = data.split('\n');

           if (req.params.id > 0 && req.params.id <= lines.length) {
               let line = lines[req.params.id-1];
               let elements = line.split(';');

               if(elements[1] !== undefined) {
                   let obj = {name: elements[0], age: elements[1]};
                   res.send(JSON.stringify(obj));
               } else {
                   let obj = {error: "empty message" };
                   res.send(JSON.stringify(obj));
               }
           } else {
               res.send('error');
           }
       }
    });
});