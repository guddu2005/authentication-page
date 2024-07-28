const url = "http://localhost:5050/api/users";
const login = document.querySelector('.LoginPage');
const sign = document.querySelector('.signup');
const btn = document.querySelector('.signBtn');
const btn2 = document.querySelector('.loginBtn');
const respBox = document.querySelector('.responseBox');
login.style.display = 'none';
btn.addEventListener('click', () => {
    sign.style.display = 'block';
    login.style.display = 'none';
})
btn2.addEventListener('click', () => {
    sign.style.display = 'none';
    login.style.display = 'block';
})

const nameField = document.querySelector('#first_name');
const passwordField = document.querySelector('#password');

let data = [];

sign.addEventListener('submit', async function (event) {
    event.preventDefault();
    let name = nameField.value;
    let pass = passwordField.value;

    if (!name || !pass) {
        console.error('name or Password is missing');
        return;
    }

    data.push({ first_name: name, password: pass });
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
            throw new Error('Unable to fetch data');
        } else {
            respBox.textContent = `Account Created`;
        }

        const responseData = await resp.json();
        console.log('Successfully uploaded', responseData);
    } catch (err) {
        console.error(err);
    }
});

const nameLogin = document.querySelector('#first_name1');
const passwordLogin = document.querySelector('#password1');
login.addEventListener('submit', async function (event) {
    event.preventDefault();

    let name = nameLogin.value;
    let pass = passwordLogin.value;

    if (!name || !pass) {
        console.error('Name or Password is missing');
        return;
    }

    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const resp = await fetch(`${url}?first_name=${name}&password=${pass}`, options);

        if (!resp.ok) {
            throw new Error('Unable to fetch data');
        } else {
            respBox.textContent = `Login Successfully`;
        }

        const responseData = await resp.json();
        console.log('Successfully uploaded', responseData);
    } catch (err) {
        console.error(err);
    }
});


