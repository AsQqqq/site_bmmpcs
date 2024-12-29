// Открытие модального окна с изображением
function openModal(image) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");
    var header = document.querySelector('header'); // Находим header

    modal.style.display = "block"; // Показываем модальное окно
    modalImg.src = image.src; // Устанавливаем изображение в модалку
    captionText.innerHTML = image.alt; // Добавляем подпись

    // Применяем анимацию для скрытия header
    header.classList.add('hide'); // Скрываем header
    document.body.style.overflow = "hidden"; // Отключаем скроллинг страницы при открытом модальном окне
}

// Закрытие модального окна
function closeModal() {
    var modal = document.getElementById("imageModal");
    var header = document.querySelector('header'); // Находим header

    modal.style.display = "none"; // Скрываем модальное окно

    // Убираем анимацию для возврата header
    header.classList.remove('hide'); // Возвращаем header
    document.body.style.overflow = "auto"; // Включаем скроллинг страницы обратно
}