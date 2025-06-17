
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  toggleBtn.classList.toggle('open')
});
const images = [
  "pic2.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpeg",
  "pic6.jpeg"
];

let currentIndex = 0;

function showImage(index) {
  const sliderImage = document.getElementById("slider-image");
  sliderImage.src = images[index];
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

showImage(currentIndex);

document.addEventListener('DOMContentLoaded', function () {
  const user = localStorage.getItem('loggedInUser');

  if (!user) {
    window.location.href = "index.html";
    const usernameSpan = document.getElementById('username-display');
    if (usernameSpan) {
      usernameSpan.textContent = user;
    }
  }

  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('loggedInUser');
      window.location.href = "index.html"; 
    });
  }
});

