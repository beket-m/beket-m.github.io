const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Array of image filenames and alt text
const images = ['img/me.JPG', 'img/needle.JPG', 'img/friends.JPG', 'img/sunset.JPG', 'img/surfing.jpeg'];
const alts = [
  'Picture of me in a uniform on a destroyer',
  'Picture of me on top of the Space Needle in Seattle',
  'Picture of me with friends at a CU game',
  'Picture of a sunset',
  'Picture of surfing'
];

// Loop through images and create thumbnails
for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', images[i]);
  newImage.setAttribute('alt', alts[i]);
  newImage.addEventListener('click', (e) => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
  thumbBar.appendChild(newImage);
}

// Toggle darken/lighten functionality
btn.addEventListener('click', () => {
  if (btn.classList.contains('dark')) {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    btn.textContent = 'Lighten';
    btn.classList.remove('dark');
  } else {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    btn.textContent = 'Darken';
    btn.classList.add('dark');
  }
});
