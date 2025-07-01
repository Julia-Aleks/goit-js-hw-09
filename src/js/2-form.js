const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
console.log(form);
const STORAGE_KEY = 'feedback-form-state';
const textarea = form.querySelector('textarea');
const email = form.querySelector('input[name="email"]');

textarea.addEventListener('input', textareaInput);
email.addEventListener('input', textareaInput);

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData) {
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';
  email.value = formData.email;
  textarea.value = formData.message;
}

function textareaInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();

  formData.email = '';
  formData.message = '';
}
