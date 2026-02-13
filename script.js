// Управление экранами
function goToScreen(screenNumber) {
    console.log('Переход на экран:', screenNumber);
    
    // Скрываем все экраны
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Показываем нужный экран
    const targetScreen = document.getElementById(`screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log('Экран активирован:', `screen-${screenNumber}`);
    } else {
        console.error('Экран не найден:', `screen-${screenNumber}`);
    }
    
    // Прокрутка наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Слайдер фотографий
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Проверка границ
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Скрываем все слайды
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Показываем текущий слайд
    if (slides[currentSlideIndex] && dots[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

// Создание летающих сердечек
function createHeart() {
    const heartsContainer = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💘'];
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Случайная позиция по горизонтали
    heart.style.left = Math.random() * 100 + '%';
    
    // Случайный размер
    const randomSize = 1.5 + Math.random() * 2;
    heart.style.fontSize = randomSize + 'rem';
    
    // Случайная длительность анимации
    const randomDuration = 3 + Math.random() * 2;
    heart.style.animationDuration = randomDuration + 's';
    
    heartsContainer.appendChild(heart);
    
    // Удаляем сердечко после окончания анимации
    setTimeout(() => {
        heart.remove();
    }, randomDuration * 1000);
}

// Взрыв сердечек
function createHeartExplosion() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}

// Случайные фоновые сердечки
function createBackgroundHeart() {
    const backgroundHearts = document.querySelector('.background-hearts');
    if (!backgroundHearts) return;
    
    const heart = document.createElement('div');
    heart.style.position = 'absolute';
    heart.style.fontSize = '2rem';
    heart.style.opacity = '0.1';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
    heart.style.animation = 'float-slow 20s infinite ease-in-out';
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    backgroundHearts.appendChild(heart);
    
    // Ограничиваем количество фоновых сердечек
    if (backgroundHearts.children.length > 10) {
        backgroundHearts.removeChild(backgroundHearts.children[0]);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, инициализация...');
    
    // Кнопка "Открыть послание"
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Кнопка "Открыть послание" нажата');
            goToScreen(2);
        });
        console.log('Обработчик кнопки старта установлен');
    } else {
        console.error('Кнопка start-button не найдена!');
    }
    
    // Кнопка "Продолжить" на экране 2
    const continue1 = document.getElementById('continue-1');
    if (continue1) {
        continue1.addEventListener('click', function() {
            console.log('Переход на экран 3');
            goToScreen(3);
        });
    }
    
    // Кнопка "Дальше" на экране 3
    const continue2 = document.getElementById('continue-2');
    if (continue2) {
        continue2.addEventListener('click', function() {
            console.log('Переход на экран 4');
            goToScreen(4);
        });
    }
    
    // Кнопка "Начать сначала"
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            console.log('Перезапуск');
            goToScreen(1);
        });
    }
    
    // Кнопка "Отправить любовь"
    const heartExplosion = document.getElementById('heart-explosion');
    if (heartExplosion) {
        heartExplosion.addEventListener('click', function() {
            console.log('Взрыв сердечек!');
            createHeartExplosion();
        });
    }
    
    // Навигация слайдера
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            changeSlide(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            changeSlide(1);
        });
    }
    
    // Точки слайдера
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Карточки с причинами
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Показываем первый слайд
    showSlide(0);
    
    // Создаём несколько фоновых сердечек
    for (let i = 0; i < 5; i++) {
        setTimeout(createBackgroundHeart, i * 1000);
    }
    
    // Добавляем периодическое создание фоновых сердечек
    setInterval(createBackgroundHeart, 10000);
    
    console.log('Инициализация завершена');
});

// Клавиатурная навигация для слайдера
document.addEventListener('keydown', function(e) {
    const screen2 = document.getElementById('screen-2');
    if (screen2 && screen2.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});
