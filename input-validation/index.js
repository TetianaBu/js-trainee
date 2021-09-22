function inputValidation() {
  const sendButton = document.querySelector('.send-phone');
  const input = document.querySelector('input');
  input.addEventListener('input', validateNumber);
  const messageHandler = document.querySelector('.form-message');

  function validateNumber() {
    const numberValidation = /^\+380[0-9]{9}$/;
    const userInputText = input.value;
    if (!userInputText.match(numberValidation)) {
      sendButton.disabled = true;
      messageHandler.textContent =
        'Type number does not follow format +380*********';
      messageHandler.style.background = 'pink';
      messageHandler.style.color = 'white';
      input.style.border = '1px solid red';
      input.style.outlineColor = 'red';
    } else {
      sendButton.disabled = false;
      messageHandler.textContent = 'Number is valid';
      messageHandler.style.background = 'green';
      messageHandler.style.color = 'white';
      input.style.border = '1px solid black';
      input.style.outlineColor = 'black';
    }
  }
  sendButton.addEventListener('click', function () {
    messageHandler.textContent = 'Data was succesfully send';
  });
}
inputValidation();