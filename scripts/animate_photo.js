// Получаем элемент с изображением машины
const car = document.querySelector('.photo__car img');

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const smoothFactor = 0.1; // Чем меньше, тем плавнее движение

// Устанавливаем обработчик события на движение мыши
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Функция, которая плавно двигает изображение с машиной
function update() {
    // Вычисляем смещение относительно центра экрана
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Смещение для X и Y
    targetX = (mouseX - width / 2) * 0.02;  // Умножаем на 0.05 для смещения
    targetY = (mouseY - height / 2) * 0.02; // Умножаем на 0.05 для смещения

    // Плавно перемещаем изображение к целевой позиции
    const currentX = parseFloat(car.style.transform.split(',')[0].split('(')[1] || 0);
    const currentY = parseFloat(car.style.transform.split(',')[1] || 0);

    // Плавное движение с использованием интерполяции
    const newX = currentX + (targetX - currentX) * smoothFactor;
    const newY = currentY + (targetY - currentY) * smoothFactor;

    // Обновляем стиль трансформации
    car.style.transform = `translate(${newX}px, ${newY}px)`;

    // Повторяем обновление через requestAnimationFrame для плавной анимации
    requestAnimationFrame(update);
}

// Запускаем функцию обновления
update();