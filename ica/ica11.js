// Function 1: tellFortune
function tellFortune(children, partnerName, location, jobTitle) {
    const fortune = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${children} kids.`;
    document.getElementById('output').innerHTML += `<p>${fortune}</p>`;
}

// Call tellFortune function 3 times
tellFortune(2, 'Alex', 'Paris', 'Software Engineer');
tellFortune(3, 'Jordan', 'New York', 'Soccer Player');
tellFortune(1, 'Taylor', 'Tokyo', 'Chef');

// Function 2: calculateDogAge
function calculateDogAge(puppyAge) {
    const dogAge = puppyAge * 7;
    document.getElementById('output').innerHTML += `<p>Your doggie is ${dogAge} years old in dog years!</p>`;
}

// Call calculateDogAge function 3 times
calculateDogAge(2);
calculateDogAge(4);
calculateDogAge(5);

// Enable user input for dog age
function userDogAgeInput() {
    const userAge = prompt('Enter your doggie\'s age:');
    if (userAge) {
        calculateDogAge(Number(userAge));
    }
}
userDogAgeInput();

// Function 3: reverseNumber
function reverseNumber(num) {
    const reversed = num.toString().split('').reverse().join('');
    document.getElementById('output').innerHTML += `<p>Reversed Number: ${reversed}</p>`;
}

// Call reverseNumber function twice
reverseNumber(32243);
reverseNumber(12345);

// Function 4: alphabetizeString
function alphabetizeString(str) {
    const sorted = str.split('').sort().join('');
    document.getElementById('output').innerHTML += `<p>Alphabetized String: ${sorted}</p>`;
}

// Call alphabetizeString function twice
alphabetizeString('webmaster');
alphabetizeString('javascript');

// Function 5: capitalizeWords
function capitalizeWords(str) {
    const capitalized = str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    document.getElementById('output').innerHTML += `<p>Capitalized Sentence: ${capitalized}</p>`;
}

// Call capitalizeWords function twice
capitalizeWords('the quick grey rabbit');
capitalizeWords('jumped over a fence');