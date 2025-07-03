const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const textarea = form.querySelector('textarea');
const email = form.querySelector('input[name="email"]');
const emailError = document.querySelector('#emailError');
const messageError = document.querySelector('#messageError');

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData && typeof savedData === 'object') {
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';
  email.value = formData.email;
  textarea.value = formData.message;
}

function textareaInput(event) {
  const { name, value } = event.target;
  if (!['email', 'message'].includes(name)) return;

  if (name === 'email') emailError.textContent = '';
  if (name === 'message') messageError.textContent = '';
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', textareaInput);
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const messageValue = textarea.value.trim();
  let hasError = false;

  if (!emailValue) {
    emailError.textContent = 'Fill please all fields';
    hasError = true;
  } else {
    emailError.textContent = '';
  }
  if (!messageValue) {
    messageError.textContent = 'Fill please all fields';
    hasError = true;
  } else {
    messageError.textContent = '';
  }
  if (hasError) return;
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);

  event.currentTarget.reset();

  formData.email = '';
  formData.message = '';
}
