const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 5050;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const dataFilePath = path.join(__dirname, 'MOCK_DATA.json');
const data = fs.readFileSync(dataFilePath, 'utf-8');
const users = JSON.parse(data);
let currentId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




app.post('/api/users', (req, res) => {
    console.log(typeof (req.body))
    const { first_name, password } = req.body[0];
    const id = currentId++;
    try {
        let user = { id, first_name, password };
        users.push(user);
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
        return res.status(200).json({ status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

app.get('/api/users/', (req, res) => {
    const { first_name, password } = req.query;
    console.log(req.query);
    const user = users.find(user => user.first_name === first_name && user.password === password);


    try {
        if (user) {
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(404).json({ status: "User Not Found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
})
app.delete('/api/users', (req, res) => {
    const { first_name ,password } = req.query;
    console.log(req.query);

    const userId = users.findIndex(user => user.first_name === first_name && user.password === password);
    console.log(userId);

    try {
        if (userId !== -1) {
            users.pop(users[userId]);
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(404).json({ status: "User Not Found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});


app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));



















































// app.get('/users', (req, res) => {
//     const html = `
//    <ul>
//         ${users.map((user) => (
//         `<li> ${user.first_name} </li>`
//     )).join('')}
//    </ul>
//    `;
//     res.send(html);
// });

// app.get('/api/users', (req, res) => {
//     return res.json(users);
// });

// app.route('/api/users/:fname')
//     .get((req, res) => {
//         let name = req.params.fname;
//         const user = users.find((user) => user.fname === name);
//         res.json(user);
//     })
//     .patch((req, res) => {
//         let name = req.params.fname;
//         const user = users.find((user) => user.name === name);
//         try {
//             Object.assign(user, req.body);
//             fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
//             res.status(200).send('User Updated Successfully!');
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         }
//     })
//     .delete((req, res) => {
//         let name = req.params.fname;
//         let id = users.findIndex(user => user.fname === name);
//         try {
//             if (id === -1) {
//                 return res.status(404).send('User Not Found to delete');
//             }
//             users.splice(id, 1);
//             fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
//             res.status(200).send('User Deleted Successfully!');
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error!');
//         }
//     });