const comicTitle = document.getElementById('comicTitle');
const comicImage = document.getElementById('comicImage');
const comicAlt = document.getElementById('comicAlt');
const comicDate = document.getElementById('comicDate');
const randomButton = document.getElementById('randomButton');

// Fetch and display a random comic between 1 and 3000
async function fetchRandomComic() {
    const randomComicNumber = Math.floor(Math.random() * 3000) + 1;
    const url = `https://corsproxy.io/?https://xkcd.com/${randomComicNumber}/info.0.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Comic not found');
        
        const comicData = await response.json();

        // Display comic details
        comicTitle.innerText = comicData.title;
        comicImage.src = comicData.img;
        comicImage.alt = comicData.alt;
        comicAlt.innerText = comicData.alt;
        
        // Format date with leading zeros for month and day if needed
        const formattedMonth = String(comicData.month).padStart(2, '0');
        const formattedDay = String(comicData.day).padStart(2, '0');
        comicDate.innerText = `Date Published: ${comicData.year}-${formattedMonth}-${formattedDay}`;
    } catch (error) {
        comicTitle.innerText = 'Error loading comic';
        comicImage.src = '';
        comicAlt.innerText = error.message;
        comicDate.innerText = '';
    }
}

// Add an event listener to the button
randomButton.addEventListener('click', fetchRandomComic);
