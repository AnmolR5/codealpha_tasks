Task-1

const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const dropdown = document.getElementById('categoryDropdown');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideshowBtn = document.getElementById('slideshowBtn');

let currentImages = [];
let currentIndex = 0;
let slideshowInterval = null;

const captions = {
  nature: "Relaxing Nature View",
  mountains: "Majestic Mountain Ranges",
  wildlife: "Exciting Wildlife Adventures",
  urban: "City Lights & Urban Life",
  seaside: "Soothing Seaside Scenes"
};

// Only use verified existing Picsum IDs
const imageCategories = {
  nature: [11, 17, 18, 19, 25, 34, 38, 53, 59, 64, 82, 32, 50, 55, 65, 70, 81, 83, 89, 85, 87, 110, 112, 114, 116, 120, 123, 127, 132, 140, 143],
  mountains: [29, 46, 54, 66, 79, 86, 118, 121, 125, 126, 128, 141],
  wildlife: [10, 15, 28, 33, 35, 40, 62, 67, 72, 75, 80, 90, 91, 93, 94, 95, 97, 98, 102, 103, 104, 105, 106, 107, 108, 109, 136, 137, 139],
  urban: [20, 21, 22, 23, 24, 26, 30, 31, 36, 39, 42, 48, 49, 52, 56, 57, 61, 63, 73, 76, 69, 43, 45, 60, 78 , 84, 88, 96, 99, 101, 111, 113, 133, 134, 142, 145, 146, 149, 115, 117, 119, 122, 129],
  seaside: [12, 13, 14, 16, 27, 37, 41, 44, 47, 51, 58, 68, 71, 77, 74, 92, 100, 124, 130, 131, 135, 138, 144, 147, 148]
};

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    loadImages(category);
    highlightActiveButton(category);
    dropdown.value = category;
  });
});

dropdown.addEventListener('change', () => {
  const category = dropdown.value;
  loadImages(category);
  highlightActiveButton(category);
});

function highlightActiveButton(category) {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

function loadImages(category) {
  gallery.innerHTML = '';
  const ids = imageCategories[category] || [];
  currentImages = ids.map(id => ({
    src: `https://picsum.photos/id/${id}/600/400`,
    caption: captions[category] + ` #${id}`
  }));

  currentImages.forEach((img, index) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.caption;
    image.dataset.index = index;

    // Optional: hide broken images
    image.onerror = () => figure.style.display = 'none';

    image.addEventListener('click', () => openLightbox(index));

    const caption = document.createElement('figcaption');
    caption.textContent = img.caption;

    figure.appendChild(image);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'flex';
  updateLightbox();
}

function updateLightbox() {
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxCaption.textContent = currentImages[currentIndex].caption;
}

function closeLightbox() {
  lightbox.style.display = 'none';
  stopSlideshow();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightbox();
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightbox();
}

function toggleSlideshow() {
  if (slideshowInterval) {
    stopSlideshow();
  } else {
    slideshowInterval = setInterval(showNext, 3000);
    slideshowBtn.textContent = '⏸';
  }
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = null;
  slideshowBtn.textContent = '▶';
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
slideshowBtn.addEventListener('click', toggleSlideshow);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Load default category
loadImages('nature');
highlightActiveButton('nature');
dropdown.value = 'nature';




Task-2 

const display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const val = button.dataset.value;
    const action = button.dataset.action;
    const func = button.dataset.func;

    if (val !== undefined) {
      if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
      }
      currentInput += val;
      display.innerText = currentInput;
    } else if (action === 'clear') {
      currentInput = '';
      display.innerText = '0';
    } else if (action === 'del') {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || '0';
    } else if (action === 'calculate') {
      try {
        const evaluated = eval(currentInput.replace('^', '**'));
        display.innerText = evaluated;
        currentInput = evaluated.toString();
        resultDisplayed = true;
      } catch {
        display.innerText = 'Error';
        currentInput = '';
      }
    } else if (func) {
      try {
        let num = parseFloat(currentInput) || 0;
        switch (func) {
          case 'sin': currentInput = Math.sin(num * Math.PI / 180).toString(); break;
          case 'cos': currentInput = Math.cos(num * Math.PI / 180).toString(); break;
          case 'tan': currentInput = Math.tan(num * Math.PI / 180).toString(); break;
          case 'sqrt': currentInput = Math.sqrt(num).toString(); break;
          case 'log': currentInput = Math.log10(num).toString(); break;
          case 'exp': currentInput = Math.exp(num).toString(); break;
          case 'pow': currentInput += '^'; break;
        }
        display.innerText = currentInput;
      } catch {
        display.innerText = 'Error';
      }
    }
  });
});

// Optional: Keyboard Support
document.addEventListener('keydown', e => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    currentInput += key;
    display.innerText = currentInput;
  } else if (key === 'Enter') {
    document.querySelector('[data-action="calculate"]').click();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0';
  } else if (key === 'Escape') {
    currentInput = '';
    display.innerText = '0';
  }
});
