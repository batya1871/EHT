var canvas_warm_up = document.getElementById("canvas-warm-up");
if (canvas_warm_up != null) {
    // Получаем контекст рисования
    var ctx = canvas_warm_up.getContext("2d");

    // Получаем текущие вычисленные размеры
    var computedStyle = window.getComputedStyle(canvas_warm_up);
    var width = parseInt(computedStyle.getPropertyValue('width'), 10);
    var height = parseInt(computedStyle.getPropertyValue('height'), 10);

    // Устанавливаем фактический размер канваса
    canvas_warm_up.width = width;
    canvas_warm_up.height = height;

    //Получаем сложность
    var difficulty_level_html = document.getElementById("hidden_difficulty_level_warm_up").value;
    var difficulty_level = difficulty_level_html.split("_")[0];
    // Время каждой короткой анимации в миллисекундах
    var animation_time = -1; // 2500 - easy 5000 - medium 10000 - hard

    switch (difficulty_level){
                        case "easy":{
                            animation_time = 2500;
                            break;
                        }
                        case "medium":{
                            animation_time = 5000;
                            break;
                        }
                        case "hard":{
                            animation_time = 10000;
                            break;
                        }
                    }

    // Индекс текущей анимации
    var currentAnimationIndex = 0;

    // Общее количество коротких анимаций
    var totalAnimations = 14;

    // Радиус точки
    var pointRadius = 30;

    // Начальная позиция точки (центр канваса)
    var point = {
        x: pointRadius,
        y: height / 2
    };

    // Время начала текущей анимации
    var animationStartTime = null;

    // Функция отрисовки точки
    function drawPoint(x, y, radius) {
        ctx.clearRect(0, 0, canvas_warm_up.width, canvas_warm_up.height); // Очищаем канвас перед каждой отрисовкой
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6f5a9a';
        ctx.fill();
        ctx.closePath();
    }

    // Анимации
    var animations = [


        // 1. Движение слева направо и обратно
        function(timestamp) {
            point.y = height / 2;
            if (!animationStartTime) animationStartTime = timestamp;
            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 1250; // Время одного цикла анимации
            // Определяем, сколько раз точка прошла весь путь в одну сторону
            var cyclesCompleted = Math.floor(elapsed / localAnimationTime);
            // Нормализуем время относительно текущего цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;
            // Определяем направление движения точки: слева направо или справа налево
            var direction = cyclesCompleted % 2 === 0 ? 1 : -1;
            // Позиция точки в текущий момент времени
            point.x = direction > 0 ? pointRadius + normalizedTime * (width - 2 * pointRadius) : width - pointRadius - normalizedTime * (width - 2 * pointRadius);
            drawPoint(point.x, point.y, pointRadius);
            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 2. Движение сверху вниз и обратно
        function(timestamp) {
            point.x = width / 2;
            if (!animationStartTime) animationStartTime = timestamp;
            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 1250; // Время одного цикла анимации
            // Определяем, сколько раз точка прошла весь путь в одну сторону
            var cyclesCompleted = Math.floor(elapsed / localAnimationTime);
            // Нормализуем время относительно текущего цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;
            // Определяем направление движения точки: сверху вниз или снизу вверх
            var direction = cyclesCompleted % 2 === 0 ? 1 : -1;
            // Позиция точки в текущий момент времени
            point.y = direction > 0 ? pointRadius + normalizedTime * (height - 2 * pointRadius) : height - pointRadius - normalizedTime * (height - 2 * pointRadius);
            drawPoint(point.x, point.y, pointRadius);
            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },


        // 3. Движение по диагонали от левого верхнего к правому нижнему углу и обратно
        function (timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 1250; // Время одного цикла анимации

            // Определяем, сколько раз точка прошла весь путь в одну сторону
            var cyclesCompleted = Math.floor(elapsed / localAnimationTime);

            // Нормализуем время относительно текущего цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;

            // Определяем направление движения точки: слева вверх и справа вниз или справа вниз и слева вверх
            var directionX = cyclesCompleted % 2 === 0 ? 1 : -1;
            var directionY = cyclesCompleted % 2 === 0 ? 1 : -1;

            // Позиция точки в текущий момент времени
            point.x = directionX > 0 ? pointRadius + normalizedTime * (width - 2 * pointRadius) : width - pointRadius - normalizedTime * (width - 2 * pointRadius);
            point.y = directionY > 0 ? pointRadius + normalizedTime * (height - 2 * pointRadius) : height - pointRadius - normalizedTime * (height - 2 * pointRadius);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 4. Движение по диагонали от правого верхнего к левому нижнему углу и обратно
        function (timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 1250; // Время одного цикла анимации

            // Определяем, сколько раз точка прошла весь путь в одну сторону
            var cyclesCompleted = Math.floor(elapsed / localAnimationTime);

            // Нормализуем время относительно текущего цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;

            // Определяем направление движения точки: справа вверх и слева вниз или слева вниз и справа вверх
            var directionX = cyclesCompleted % 2 === 0 ? 1 : -1;
            var directionY = cyclesCompleted % 2 === 0 ? 1 : -1;

            // Позиция точки в текущий момент времени
            point.x = directionX > 0 ? width - pointRadius - normalizedTime * (width - 2 * pointRadius) : pointRadius + normalizedTime * (width - 2 * pointRadius);
            point.y = directionY > 0 ? pointRadius + normalizedTime * (height - 2 * pointRadius) : height - pointRadius - normalizedTime * (height - 2 * pointRadius);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 5. Движение по кругу по часовой стрелке
        function (timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;
            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 2500; // Время одного цикла анимации

            // Определяем, сколько раз точка прошла весь путь в одну сторону
            var cyclesCompleted = Math.floor(elapsed / localAnimationTime);

            // Нормализуем время относительно текущего цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;
            var angle = normalizedTime * 2 * Math.PI;

            // Позиция точки в текущий момент времени
            point.x = width / 2 + (width / 2 - pointRadius) * Math.cos(angle);
            point.y = height / 2 + (height / 2 - pointRadius) * Math.sin(angle);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 6. Движение по кругу против часовой стрелки
        function (timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 2500; // Время одного цикла анимации

            // Определяем, сколько раз точка прошла весь путь в одну сторону
            var cyclesCompleted = Math.floor(elapsed / localAnimationTime);

            // Нормализуем время относительно текущего цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;
            var angle = -normalizedTime * 2 * Math.PI;

            // Позиция точки в текущий момент времени
            point.x = width / 2 + (width / 2 - pointRadius) * Math.cos(angle);
            point.y = height / 2 + (height / 2 - pointRadius) * Math.sin(angle);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 7. Движение по прямоугольнику по часовой стрелке
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 625; // Время одного цикла анимации (одной стороны прямоугольника)
            var sideDuration = localAnimationTime * 4; // Общее время для прохождения всех сторон прямоугольника

            // Определяем текущую сторону прямоугольника на основе прошедшего времени
            var currentSideIndex = Math.floor(elapsed / localAnimationTime) % 4;

            // Позиция точки в текущий момент времени
            var progress = (elapsed % localAnimationTime) / localAnimationTime;
            switch (currentSideIndex) {
                case 0: // Старт - левый верхний угол канваса
                    point.x = pointRadius + progress * (width - 2 * pointRadius);
                    point.y = pointRadius;
                    break;
                case 1: // Первая сторона - правый верхний угол канваса
                    point.x = width - pointRadius;
                    point.y = pointRadius + progress * (height - 2 * pointRadius);
                    break;
                case 2: // Вторая сторона - правый нижний угол канваса
                    point.x = width - pointRadius - progress * (width - 2 * pointRadius);
                    point.y = height - pointRadius;
                    break;
                case 3: // Третья сторона - левый нижний угол канваса
                    point.x = pointRadius;
                    point.y = height - pointRadius - progress * (height - 2 * pointRadius);
                    break;
            }

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 8. Движение по прямоугольнику против часовой стрелки
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 625; // Время одного цикла анимации (одной стороны прямоугольника)
            var sideDuration = localAnimationTime * 4; // Общее время для прохождения всех сторон прямоугольника

            // Определяем текущую сторону прямоугольника на основе прошедшего времени
            var currentSideIndex = Math.floor(elapsed / localAnimationTime) % 4;

            // Позиция точки в текущий момент времени
            var progress = (elapsed % localAnimationTime) / localAnimationTime;
            switch (currentSideIndex) {
                case 0: // Старт - левый верхний угол канваса
                    point.x = pointRadius;
                    point.y = pointRadius + progress * (height - 2 * pointRadius);
                    break;
                case 1: // Первая сторона - левый нижний угол канваса
                    point.x = pointRadius + progress * (width - 2 * pointRadius);
                    point.y = height - pointRadius;
                    break;
                case 2: // Вторая сторона - правый нижний угол канваса
                    point.x = width - pointRadius;
                    point.y = height - pointRadius - progress * (height - 2 * pointRadius);
                    break;
                case 3: // Третья сторона - левый нижний угол канваса
                    point.x = width - pointRadius - progress * (width - 2 * pointRadius);
                    point.y = pointRadius;
                    break;
            }

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
    },

        // 9. Движение по замкнутому контуру квадрата по часовой
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 625; // Время одного цикла анимации (одной стороны квадрата)

            // Определяем текущую сторону квадрата на основе прошедшего времени
            var currentSideIndex = Math.floor(elapsed / localAnimationTime) % 4;

            // Позиция точки в текущий момент времени
            var progress = (elapsed % localAnimationTime) / localAnimationTime;
            switch (currentSideIndex) {
                case 0: // Старт - левый верхний угол канваса
                    point.x = pointRadius + progress * (width - 2 * pointRadius);
                    point.y = pointRadius + progress * (height - 2 * pointRadius);
                    break;
                case 1: // Первая сторона - правый нижний угол
                    point.x = width - pointRadius;
                    point.y = height - pointRadius - progress * (height - 2 * pointRadius);
                    break;
                case 2: // Вторая сторона - правый верхний
                    point.x = width - pointRadius - progress * (width - 2 * pointRadius);
                    point.y = pointRadius + progress * (height - 2 * pointRadius);
                    break;
                case 3: // Третья сторона - левый нижний
                    point.x = pointRadius;
                    point.y = height - pointRadius - progress * (height - 2 * pointRadius);
                    break;
            }

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

         // 10. Движение по замкнутому контуру квадрата против часовой
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 625; // Время одного цикла анимации (одной стороны квадрата)

            // Определяем текущую сторону квадрата на основе прошедшего времени
            var currentSideIndex = Math.floor(elapsed / localAnimationTime) % 4;

            // Позиция точки в текущий момент времени
            var progress = (elapsed % localAnimationTime) / localAnimationTime;
            switch (currentSideIndex) {
                case 0: // Старт - левый верхний угол канваса
                    point.x = pointRadius;
                    point.y = pointRadius + progress * (height - 2 * pointRadius);
                    break;
                case 1: // Первая сторона - левый нижний угол
                    point.x = pointRadius + progress * (width - 2 * pointRadius);
                    point.y = height - pointRadius - progress * (height - 2 * pointRadius);
                    break;
                case 2: // Вторая сторона - правый верхний угол канваса
                    point.x = width - pointRadius;
                    point.y = pointRadius + progress * (height - 2 * pointRadius);
                    break;
                case 3: // Третья сторона - правый нижний
                    point.x = width - pointRadius - progress * (width - 2 * pointRadius);
                    point.y = height - pointRadius - progress * (height - 2 * pointRadius);
                    break;
            }

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 11. Движение по форме символа бесконечности по часовой стрелке
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 2500; // Время одного полного цикла символа бесконечности

            // Нормализуем время относительно одного полного цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;

            // Угол для текущего момента времени
            var angle = normalizedTime * 2 * Math.PI;

            // Константы для размеров петель символа бесконечности
            var A = width / 2.5;
            var B = height / 2.5;

            // Параметрические уравнения для символа бесконечности
            point.x = width / 2 + A * Math.sin(angle);
            point.y = height / 2 + B * Math.sin(angle) * Math.cos(angle);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },
        // 12. Движение по форме символа бесконечности против часовой стрелки
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 2500; // Время одного полного цикла символа бесконечности

            // Нормализуем время относительно одного полного цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;

            // Угол для текущего момента времени
            var angle = normalizedTime * 2 * Math.PI;

            // Константы для размеров петель символа бесконечности
            var A = width / 2.5;
            var B = height / 2.5;

            // Параметрические уравнения для символа бесконечности
            point.x = width / 2 - A * Math.sin(angle);
            point.y = height / 2 - B * Math.sin(angle) * Math.cos(angle);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

        // 13. Движение по форме восьмерки по часовой стрелке
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 2500; // Время одного полного цикла восьмерки

            // Нормализуем время относительно одного полного цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;

            // Угол для текущего момента времени
            var angle = normalizedTime * 2 * Math.PI;

            // Константы для размеров петель восьмерки
            var A = width / 2.5;
            var B = height / 2.5;

            // Параметрические уравнения для восьмерки (перевернутой)
            point.x = width / 2 + A * Math.sin(angle) * Math.cos(angle);
            point.y = height / 2 + B * Math.sin(angle);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },
        // 14. Движение по форме восьмерки против часовой стрелки
        function(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;

            var elapsed = timestamp - animationStartTime;
            var localAnimationTime = 2500; // Время одного полного цикла восьмерки

            // Нормализуем время относительно одного полного цикла
            var normalizedTime = (elapsed % localAnimationTime) / localAnimationTime;

            // Угол для текущего момента времени
            var angle = normalizedTime * 2 * Math.PI;

            // Константы для размеров петель восьмерки
            var A = width / 2.5;
            var B = height / 2.5;

            // Параметрические уравнения для восьмерки (перевернутой)
            point.x = width / 2 - A * Math.sin(angle) * Math.cos(angle);
            point.y = height / 2 - B * Math.sin(angle);

            drawPoint(point.x, point.y, pointRadius);

            // Проверяем, завершена ли анимация
            if (elapsed < animation_time) {
                requestAnimationFrame(animations[currentAnimationIndex]);
            } else {
                animationStartTime = null;
                currentAnimationIndex++;
                runNextAnimation();
            }
        },

    ];

    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }
    var resut_url = window.location.href + "/grade/";


    function handleResponse(response) {
        window.location.href = resut_url;
    }

    // Функция для запуска следующей анимации
    function runNextAnimation() {
        if (currentAnimationIndex < totalAnimations) {
            animationStartTime = null;  // Сброс времени начала анимации
            requestAnimationFrame(animations[currentAnimationIndex]);
        } else {
            httpGetAsync(resut_url,handleResponse);
        }
    }

    runNextAnimation();
}
