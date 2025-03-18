const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-content img');
const closeButton = document.querySelector('.close-button');
const downloadButton = document.querySelector('.download-button');
const prevButton = document.getElementById('prev-image');
const nextButton = document.getElementById('next-image');

// Разделенные данные об изображениях
const galleryImages = {
    "nature-gallery": [
        { src: "images/Тьма.jpg", alt: "Природа 1", download: "images/Тьма2.pdf" },
        
    ],
    "city-gallery": [
        { src: "images/city1.jpg", alt: "Город 1", download: "images/city1.jpg" }
    ],
    "animal-gallery": [
        { src: "images/animal1.jpg", alt: "Животное 1", download: "images/animal1.jpg" }
    ]
};

const modalImages = {
    "nature-gallery": [...galleryImages["nature-gallery"]],
    "city-gallery": [...galleryImages["city-gallery"]],
    "animal-gallery": [...galleryImages["animal-gallery"]]
};

let currentGallery = null;
let currentImageIndex = 0;

function openModal(galleryId, imageIndex) {
    currentGallery = modalImages[galleryId];
    currentImageIndex = imageIndex;

    if (currentGallery && currentGallery.length > 0) {
        updateModalContent();
        modal.classList.add('modal-active');
    }
}

function updateModalContent() {
    const imageData = currentGallery[currentImageIndex];
    modalImage.src = imageData.src;
    downloadButton.href = imageData.download;
    prevButton.disabled = currentImageIndex === 0;
    nextButton.disabled = currentImageIndex === currentGallery.length - 1;
}

function closeModal() {
    modal.classList.remove('modal-active');
}

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('modal-active')) {
        closeModal();
    }
});

prevButton.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalContent();
    }
});

nextButton.addEventListener('click', () => {
    if (currentImageIndex < currentGallery.length - 1) {
        currentImageIndex++;
        updateModalContent();
    }
});

// Функция для создания и добавления изображений в основную галерею
function addImagesToGallery() {
    for (const galleryId in galleryImages) {
        const gallery = document.getElementById(galleryId);
        if (gallery && galleryImages[galleryId]) {
            galleryImages[galleryId].forEach((imageData, index) => {
                const img = document.createElement('img');
                img.src = imageData.src;
                img.alt = imageData.alt;
                img.onclick = () => openModal(galleryId, index);
                gallery.appendChild(img);
            });
        }
    }
}

// Загружаем изображения при загрузке страницы
addImagesToGallery();

// Пример добавления изображений только в модальное окно для конкретной галереи
modalImages["nature-gallery"].push(
    { src: "images/Глава.png", alt: "Глава 1", download: "images/Glav1.png" },
    { src: "images/Глава2.png", alt: "Глава 2", download: "images/Glav2.png" },
    { src: "images/Глава3.png", alt: "Глава 1", download: "images/Glav1.png" },
    { src: "images/Глава4.png", alt: "Глава 2", download: "images/Glav2.png" }
);

modalImages["city-gallery"].push(
    { src: "images/Glav1.png", alt: "Глава 1", download: "images/Glav1.png" },
    { src: "images/Glav2.png", alt: "Глава 2", download: "images/Glav2.png" }
    
);

modalImages["animal-gallery"].push(
    { src: "images/Glav1.png", alt: "Глава 1", download: "images/Glav1.png" },
    { src: "images/Glav2.png", alt: "Глава 2", download: "images/Glav2.png" }
);