// Select the required elements
const form1 = document.querySelector('.sign1');
const form2 = document.querySelector('.signIn');
const form3 = document.querySelector('.sign2');

const createBtn = document.querySelector('.create');
const signBtn = document.querySelector('.signbtn');
const passBtn = document.querySelector('.passbtn');
const submitCreate = document.querySelector('.createContinue');
const forgotBtn = document.querySelector('.forgotBtn');

const emailField1 = document.querySelector('#email');
const nameField = document.querySelector('#text');
const notify1 = document.querySelector('.notify1 ');
const notify2 = document.querySelector('.notify2 ');
let current = true;
createBtn.addEventListener('click', () => {
    if (current) {
        form2.style.zIndex = 0;
        form1.style.zIndex = 10;
        form3.style.zIndex = -1;
        form2.style.filter = 'blur(2px)';
        form1.style.filter = 'blur(0px)';
        current = false;
    } else{
        current=true;
    }
    
});
passBtn.addEventListener('click', () => {
   
    if(!current) {
        form3.style.zIndex = 10;
        form2.style.zIndex = 0;
        form1.style.zIndex = -1;
        form2.style.filter = 'blur(2px)';
        form1.style.filter = 'blur(2px)';
        form3.style.filter = 'none';
        current = true;
    }else{
        current=false;
    }
})
signBtn.addEventListener('click', () => {
   
    if(current) {
        form3.style.zIndex = 0;
        form2.style.zIndex = 10;
        form1.style.zIndex = 0;
        form2.style.filter = 'none';
        form1.style.filter = 'blur(2px)';
        form3.style.filter = 'blur(2px)';
        current = false;
    }else{
        current=true;
    }
})



// Define the URL and data array
const url = "http://localhost:5050/api/users";
let data = [];


// Add event listener for form1 submit
// form1.addEventListener('submit', async function (event) {
//     event.preventDefault();

//     let email = emailField1.value;
//     let name = nameField.value;

//     if (!email || !name) {
//         console.error('Email or Password is missing');
//         return;
//     }

//     data.push({ first_name: name, email: email });

//     const options = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     };

//     try {
//         const resp = await fetch(url, options);

//         if (!resp.ok) {
//             throw new Error('Unable to fetch data');
//         }

//         const responseData = await resp.json();
//         respBox.textContent = `Account Created: ${responseData.message || 'Success'}`;
//         console.log('Successfully uploaded', responseData);
//     } catch (err) {
//         console.error(err);
//     }
// });
form1.addEventListener('submit', async function (event) {
    event.preventDefault();

    let email = emailField1.value;
    let name = nameField.value;

    if (!email || !name) {
        console.error('Email or Name is missing');
        return;
    }

    data.push({ first_name: name, email: email });

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
        }

        const responseData = await resp.json();
        notify1.textContent = `Account Created: ${responseData.message || 'Success'}`;
        console.log('Successfully uploaded', responseData);
    } catch (err) {
        console.error(err);
    }
});


const emailField2 = document.querySelector('#emaillog');
form2.addEventListener('submit', async function (event) {
    event.preventDefault();
    let email = emailField2.value;

    if (!email) {
        console.error('Email is missing');
        return;
    }

    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const resp = await fetch(`${url}?email=${email}`, options);

        if (!resp.ok) {
            throw new Error('Unable to fetch data');
        } 
        else {
            notify2.textContent = `Login Successfully `;
            // console.log('Successfully uploaded', responseData);
    
        }

        const responseData = await resp.json();
        console.log('Successfully uploaded', responseData);
    } catch (err) {
        notify2.textContent = `User Not Found  `;
        console.error(err);
    }
})

const home_page = document.querySelector('.mainContent');

