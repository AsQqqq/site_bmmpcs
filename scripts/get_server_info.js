let currentServers = {};  // Сохраняем текущее состояние карточек

async function getPlayers() {
    try {
        // Словарь для изображений по IP:порт
        const serverImages = {
            "202.181.188.145:29000": "https://i.ytimg.com/vi/Sb_vh_l_gc0/maxresdefault.jpg",
            "202.181.188.145:29001": "https://avatars.mds.yandex.net/i?id=41d8d67eff2143f07972c147c828d9fbd03cce2c-10469104-images-thumbs&n=13",
            "202.181.188.145:29003": "https://i.ytimg.com/vi/G7rNYCtyj7Y/maxresdefault.jpg",
            "202.181.188.145:29002": "https://www.modsgaming.us/_ld/564/16503241.jpg",
            "202.181.188.145:29004": "https://i.ytimg.com/vi/JVJHvFFSNDY/maxresdefault.jpg",
            "202.181.188.145:29005": "https://i.ytimg.com/vi/JKWm-gDrWz4/maxresdefault.jpg",
            "202.181.188.145:31432": "https://i1.modland.net/i/650bc320500b5/screenshot_2023-09-29_15-12-14-lg_modland.webp",
            "202.181.188.145:43009": "https://i1.modland.net/i/632ec5b944432/image_2022-10-13_171608135-lg_modland.webp",
            "202.181.188.145:38646": "https://www.beamng.com/attachments/east_coast_usa_winter_preview1-jpg.76231",
            "202.181.188.145:44993": "https://www.beamng.com/attachments/screenshot_2021-11-25_08-58-12-png.858258",
            "202.181.188.145:31577": "https://i1.modland.net/i/632ec5b944432/634481d4ee9c8/18539044-lg_modland.webp"
        };

        // Выполняем запрос к API
        const response = await fetch("https://beammp-custom-server.ru/api/v1/get_list_server");

        if (!response.ok) {
            console.error(`Ошибка при получении данных: ${response.statusText}`);
            return;
        }

        // Преобразуем полученные данные в JSON
        const data = await response.json();

        // Фильтруем только те сервера, которые у нас в списке
        const filteredServers = data.filter(server => {
            return servers.some(s => s.ip === server.ip && s.port === server.port);
        });

        // Получаем текущий список серверов на странице
        const serverListElement = document.getElementById("servers-list");
        
        // Убираем все серверы, которые больше не существуют в ответе API
        Object.keys(currentServers).forEach(key => {
            const serverInAPI = filteredServers.find(server => `${server.ip}:${server.port}` === key);
            if (!serverInAPI) {
                // Если сервер исчез из API, удаляем его
                const serverElement = currentServers[key];
                serverElement.classList.add('hide');
                setTimeout(() => {
                    serverElement.remove();
                    delete currentServers[key];
                }, 500);  // Задержка для анимации исчезновения
            }
        });

        // Добавляем новые серверы, которых еще нет на странице
        filteredServers.forEach(server => {
            const serverKey = `${server.ip}:${server.port}`;
            if (!currentServers[serverKey]) {
                const serverInfoElement = document.createElement("div");
                serverInfoElement.classList.add("server-item");
                
                // Устанавливаем изображение фона
                if (serverImages[serverKey]) {
                    serverInfoElement.style.backgroundImage = `url(${serverImages[serverKey]})`;
                }

                const serverInfoText = document.createElement("span");
                serverInfoText.classList.add("server-item-text");
                serverInfoText.textContent = `${server.players} / ${server.maxplayers}`;

                // Кнопка для копирования
                const copyButton = document.createElement("button");
                copyButton.classList.add("copy-button");
                copyButton.textContent = "Копировать адрес";
                copyButton.addEventListener("click", () => copyToClipboard(copyButton, server.ip, server.port));

                // Добавляем элементы на страницу
                serverInfoElement.appendChild(serverInfoText);
                serverInfoElement.appendChild(copyButton);
                serverListElement.appendChild(serverInfoElement);

                // Плавно показываем сервер
                setTimeout(() => {
                    serverInfoElement.classList.add('show');
                }, 50); // Небольшая задержка для анимации

                // Сохраняем элемент в текущем списке
                currentServers[serverKey] = serverInfoElement;
            }
        });

    } catch (error) {
        console.error("Произошла ошибка при запросе данных:", error);
    }
}

// Функция для копирования IP и порта в буфер обмена
function copyToClipboard(copyButton, ip, port) {
    const textToCopy = `${ip}:${port}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Изменяем текст кнопки и её стиль
            copyButton.textContent = "Скопировано!";
            copyButton.style.backgroundColor = "#4CAF50"; // Зеленый цвет кнопки

            setTimeout(() => {
                copyButton.textContent = "Копировать адрес";
                copyButton.style.backgroundColor = "#f24f4f"; // Исходный цвет кнопки
            }, 1000);
        })
        .catch(err => {
            console.error('Ошибка при копировании:', err);
        });
}

// Данные серверов
const servers = [
    { ip: "202.181.188.145", port: "29000" },
    { ip: "202.181.188.145", port: "29001" },
    { ip: "202.181.188.145", port: "29003" },
    { ip: "202.181.188.145", port: "29002" },
    { ip: "202.181.188.145", port: "29004" },
    { ip: "202.181.188.145", port: "29005" },
    { ip: "202.181.188.145", port: "31432" },
    { ip: "202.181.188.145", port: "43009" },
    { ip: "202.181.188.145", port: "38646" },
    { ip: "202.181.188.145", port: "44993" },
    { ip: "202.181.188.145", port: "31577" }
];

// Запускаем обновление серверов каждые 5 секунд
setInterval(getPlayers, 5000);

// Инициализируем первый запрос
getPlayers();
