
export default function formValidation() {

const form =  document.querySelector('.form__action');
const name = form.querySelector('.form__name');
const email = form.querySelector('.form__email');
const phone = form.querySelector('.form__phone');

function generateError(text) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
}

function removeError() {
    const errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
}

function lengthValidation(field) {
    if ((field.value.length < 3) || (field.value.length > 15)) {
        const error = generateError('At least 3 characters long and less then 15 characters');
        field.parentElement.insertBefore(error, field);
    }
    
}

function nameValidation() {
    name.style.borderColor = '#030303';
    removeError();
    lengthValidation(this);
    
    const letters = /^[A-Za-zа-яёА-ЯЁ ]+$/;
    if (!name.value.match(letters)) {
        const error = generateError('Name must contains only letters (no special characters)');
        name.parentElement.insertBefore(error, name);
        name.style.borderColor = 'red';
    }

}

function emailValidation() {
    email.style.borderColor = '#030303';
    removeError();
    let mailformat = /^[A-Za-z0-9.-]{3,15}@[A-Za-z]{4,}.[A-Za-z]{2,}$/;
    
   
    if (!email.value.match(mailformat)) {
        const error = generateError('You have entered an invalid email address');
        email.parentElement.insertBefore(error, email);
        email.style.borderColor = 'red';
    }

}

function phoneValidation() {
    phone.style.borderColor = '#030303';
    removeError();
    let phoneformat = /^[0-9]{2,3}[- ][0-9]{2,3}(([- ][0-9]{2,3})*)$/;
    let phoneformat1 = /^[0-9]+$/;
    let str = phone.value.replace(/[- ]/g, '');
    if ((!phone.value.match(phoneformat)&& !phone.value.match(phoneformat1))|| str.length<1 || str.length>10) {
        const error = generateError('You have entered an invalid phone');
        phone.parentElement.insertBefore(error, phone);
        phone.style.borderColor = 'red';
    }

}

name.addEventListener('blur', nameValidation);
email.addEventListener('blur', emailValidation);
phone.addEventListener('blur', phoneValidation);
}