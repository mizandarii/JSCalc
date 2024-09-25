"use strict";

const inputEur = document.querySelector('#eur'),
      inputUsd = document.querySelector('#usd'),
      inputRub = document.querySelector('#rub');

// Function to perform the currency conversion
function convertCurrency() {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json'); // Ensure this path is correct
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => {
        if (request.status === 200) {
            const data = JSON.parse(request.response);
            const euroValue = parseFloat(inputEur.value); // Ensure it's a number

            // Check if euroValue is a valid number
            if (!isNaN(euroValue)) {
                // Convert Euro to USD and RUB
                inputUsd.value = (euroValue * data.current.usd).toFixed(2);
                inputRub.value = (euroValue * data.current.rub).toFixed(2);
            } else {
                // If not a valid number, clear the output fields
                inputUsd.value = "";
                inputRub.value = "";
            }
        } else {
            inputUsd.value = "Something went wrong";
            inputRub.value = "Something went wrong"; // Handle error for RUB conversion as well
        }
    });
}

// Listen for the input event to update values as the user types
inputEur.addEventListener('input', convertCurrency);

// Optional: Listen for the keydown event to detect when Enter is pressed
inputEur.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission (if any)
        convertCurrency(); // Call the conversion function
    }
});
