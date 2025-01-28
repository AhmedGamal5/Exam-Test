const form = document.getElementsByTagName('form')[0];
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const EmailInput = document.getElementById('email');
const PasswordInput = document.getElementById('password');
const RePasswordInput = document.getElementById('Re-Enter');
const FNerrorText = document.getElementById('FNerrorText');
const LNerrorText = document.getElementById('LNerrorText');
const EMerrorText = document.getElementById('EMerrorText');
const PWerrorText = document.getElementById('PWerrorText');
const RePWerrorText = document.getElementById('RePWerrorText');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();
    const eMailValue = EmailInput.value.trim();
    const PasswordValue = PasswordInput.value.trim();
    const RePasswordValue = RePasswordInput.value.trim();
    const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
    const MailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

    // FirstName Validation
    if (firstNameValue === "") {
        e.preventDefault();
        FNerrorText.innerText = "First Name Is Required!";
        firstNameInput.classList.add('error-border');
        FNerrorText.style.display = 'block';
        isValid = false;
    } else if (!lettersOnlyRegex.test(firstNameValue)) {
        e.preventDefault();
        FNerrorText.innerText = "First Name Must Contain Letters Only";
        firstNameInput.classList.add('error-border');
        FNerrorText.style.display = 'block';
        isValid = false;
    } else {
        firstNameInput.classList.remove('error-border');
        FNerrorText.style.display = 'none';
    }

    // LastName Validation
    if (lastNameValue === "") {
        e.preventDefault();
        LNerrorText.innerText = "Last Name Is Required!";
        lastNameInput.classList.add('error-border');
        LNerrorText.style.display = 'block';
        isValid = false;
    } else if (!lettersOnlyRegex.test(lastNameValue)) {
        e.preventDefault();
        LNerrorText.innerText = "Last Name Must Contain Letters Only";
        lastNameInput.classList.add('error-border');
        LNerrorText.style.display = 'block';
        isValid = false;
    } else {
        lastNameInput.classList.remove('error-border');
        LNerrorText.style.display = 'none';
    }

    // Email Validation
    if (eMailValue === "") {
        e.preventDefault();
        EMerrorText.innerText = "Email Is Required!";
        EmailInput.classList.add('error-border');
        EMerrorText.style.display = 'block';
        isValid = false;
    } else if (!MailRegex.test(eMailValue)) {
        e.preventDefault();
        EMerrorText.innerText = "Email Must Be in the Required Format";
        EmailInput.classList.add('error-border');
        EMerrorText.style.display = 'block';
        isValid = false;
    } else {
        EmailInput.classList.remove('error-border');
        EMerrorText.style.display = 'none';
    }

    // Password Validation
    if (PasswordValue === "") {
        e.preventDefault();
        PWerrorText.innerText = "Password Is Required!";
        PasswordInput.classList.add('error-border');
        PWerrorText.style.display = 'block';
        isValid = false;
    } else if (PasswordValue.length < 9) {
        e.preventDefault();
        PWerrorText.innerText = "Password Must Contain 9 Characters at Least!";
        PasswordInput.classList.add('error-border');
        PWerrorText.style.display = 'block';
        isValid = false;
    } else {
        PasswordInput.classList.remove('error-border');
        PWerrorText.style.display = 'none';
    }

    // ReEnter Password Validation
    if (RePasswordValue === "") {
        e.preventDefault();
        RePWerrorText.innerText = "This Field Is Required!";
        RePasswordInput.classList.add('error-border');
        RePWerrorText.style.display = 'block';
        isValid = false;
    } else if (RePasswordValue !== PasswordValue) {
        e.preventDefault();
        RePWerrorText.innerText = "This Field Must Contain the Same Value as Password Field!";
        RePasswordInput.classList.add('error-border');
        RePWerrorText.style.display = 'block';
        isValid = false;
    } else {
        RePasswordInput.classList.remove('error-border');
        RePWerrorText.style.display = 'none';
    }

    // Save data to local storage if the form is valid
    if (isValid) {
        const newUser = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: eMailValue,
            password: PasswordValue,
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];

        
        const emailExists = users.some(user => user.email === eMailValue);
        if (emailExists) {
            EMerrorText.innerText = "There is an account registered with this Email!";
            EmailInput.classList.add('error-border');
            EMerrorText.style.display = 'block';
            isValid = false;
            return;
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        window.location.href = '../login/login.html'; 
    }
});


firstNameInput.addEventListener('input', () => {
    firstNameInput.classList.remove('error-border');
    FNerrorText.style.display = 'none';
});

lastNameInput.addEventListener('input', () => {
    lastNameInput.classList.remove('error-border');
    LNerrorText.style.display = 'none';
});

EmailInput.addEventListener('input', () => {
    EmailInput.classList.remove('error-border');
    EMerrorText.style.display = 'none';
});

PasswordInput.addEventListener('input', () => {
    PasswordInput.classList.remove('error-border');
    PWerrorText.style.display = 'none';
});

RePasswordInput.addEventListener('input', () => {
    RePasswordInput.classList.remove('error-border');
    RePWerrorText.style.display = 'none';
});