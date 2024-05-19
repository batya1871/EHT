//Получаем канвас
var canvas = document.getElementById("canvas-task");
//Если он существует, то начинаем анимацию
if (canvas != null){
    //Ебка с размерами канваса
    // Получаем текущие вычисленные размеры
    var computedStyle = window.getComputedStyle(canvas);
    var width = parseInt(computedStyle.getPropertyValue('width'), 10);
    var height = parseInt(computedStyle.getPropertyValue('height'), 10);

    // Устанавливаем фактический размер канваса
    canvas.width = width;
    canvas.height = height;

    console.log("width = " + canvas.width);
    console.log("height = " + canvas.height);


    //Принимаем переменные с формы
    var start_animation_div = document.getElementById("start-animation-id");
    var end_animation_div = document.getElementById("end-animation-id");
    var task = document.getElementById("hidden_task").value;
    var difficulty_level_html = document.getElementById("hidden_difficulty_level").value;
    var type_of_warm_up = document.getElementById("hidden_type_of_warm_up").value;
    var animatic_type = document.getElementById("hidden_animatic_type").value;
    var result = document.getElementById("hidden_result");
    is_answered = false;
    var is_answered_text = ((document.getElementById("hidden_id_answered").value).toLowerCase());
    if (is_answered_text == "true") {
        is_answered = true;
    }

    //Объявляем общие переменные
    var ctx = canvas.getContext("2d");
    var difficulty_level = difficulty_level_html.split("_")[0];
    if (is_answered){
        start_animation_div.classList.add("input-hidden");
        end_animation_div.classList.remove("input-hidden");
    }
    else{
        // Получаем кнопку по ее id
        var button_animation = document.getElementById("start-animation-btn-id");
        // Добавляем обработчик события "click" к кнопке
        console.log("ЖДЕМ КНОПКУ");
        button_animation.addEventListener("click", function() {
            console.log("НАЖАТА");
            start_animation_div.classList.add("input-hidden");
            //Делаем разбивку на два разных режима
            switch (type_of_warm_up){
                case "observation":{
                    //Общие переменные для этого режима
                    var radius = -1;
                    var FilledTime = -1;
                    switch (difficulty_level){
                        case "easy":{
                            radius = 40;
                            FilledTime = 1500;
                            break;
                        }
                        case "medium":{
                            radius = 30;
                            FilledTime = 1300;
                            break;
                        }
                        case "hard":{
                            radius = 25;
                            FilledTime = 1200;
                            break;
                        }
                    }
                    var clickLimit = parseInt(task);
                    //Диапазон между открытием блока для кликов
                    var minSec = 3000;
                    var maxSec = 4000;
                    var isEndOfAnimation = false;
                    var timeOfAnimation = ((clickLimit)*(maxSec + FilledTime) + 500);

                    // Массивы с интервалами
                    var intervals = [Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec, FilledTime];
                    // Текущий индекс интервала
                    var currentIntervalIndex = 0;

                    //Делаем разбивку по типу анимаций
                    switch (animatic_type){
                        case "pingpong":{
                            var xSpeed = -1;
                            var ySpeed = -1;
                            ctx.strokeStyle = "#9682C4"; // Цвет контура
                            ctx.fillStyle = "#0CA725"; // Цвет заливки
                            //Скорость движения меча в зависимости от уровня сложности
                            console.log("Уровень сложности = " +difficulty_level);
                            switch (difficulty_level){
                                case "easy":{
                                    xSpeed = 4;
                                    ySpeed = 2;
                                    break;
                                }
                                case "medium":{
                                    console.log("Уровень сложности отработал ");
                                    xSpeed = 5;
                                    ySpeed = 3;
                                    break;
                                }
                                case "hard":{
                                    xSpeed = 6;
                                    ySpeed = 4;
                                    break;
                                }
                            }
                            var circle = function (x, y, radius, fillCircle) {
                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                            if (fillCircle) {
                                ctx.fill();
                            } else {
                                ctx.stroke();
                            }
        };

                            var Ball = function (xSpeed, ySpeed, radius, clickLimit) {
                                this.x = width / 2;
                                this.y = height / 2;
                                this.xSpeed = xSpeed;
                                this.ySpeed = ySpeed;
                                this.radius = radius;
                                this.isFilled = false;
                                this.clickable = true;
                                this.showCount = 0;
                                this.clickCount = 0; // Счетчик кликов
                                this.clickLimit = clickLimit; // Максимальное количество кликов
                            };

                            Ball.prototype.move = function () {
                                // Проверка на выход за границы по горизонтали
                                if (this.x - this.radius < 0 || this.x + this.radius > width) {
                                    this.xSpeed = -this.xSpeed;
                                }
                                // Проверка на выход за границы по вертикали
                                if (this.y - this.radius < 0 || this.y + this.radius > height) {
                                    this.ySpeed = -this.ySpeed;
                                }
                                this.x += this.xSpeed;
                                this.y += this.ySpeed;
                            };

                            Ball.prototype.draw = function () {
                                circle(this.x, this.y, this.radius, this.isFilled);
                            };

                            var ball = new Ball(xSpeed, ySpeed, radius, clickLimit);

                            // Функция для смены интервала
                            function changeInterval() {
                                if (!isEndOfAnimation){
                                        currentIntervalIndex++;
                                    if (currentIntervalIndex == 1) {
                                        intervals[0] = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;

                                    }
                                    if (currentIntervalIndex >= intervals.length) {
                                        currentIntervalIndex = 0;
                                    }
                                }
                            }

                            Ball.prototype.toggleFill = function () {
                                if (this.isFilled){
                                    this.isFilled = false;
                                    this.clickable = false;
                                    changeInterval();
                                }
                                else {
                                    if (this.showCount < (this.clickLimit)) {
                                        this.clickable = true;
                                        this.isFilled = true;
                                        changeInterval();
                                    }
                                }

                                if (this.isFilled && this.clickCount < this.clickLimit) {
                                    canvas.addEventListener("click", clickHandler);
                                } else {
                                    canvas.removeEventListener("click", clickHandler);
                                }
                                if (!isEndOfAnimation){
                                    setTimeout(function () {
                                    ball.toggleFill();
                                    if (ball.isFilled && ball.showCount < ball.clickLimit) ball.showCount++;
                                    }, intervals[currentIntervalIndex]);
                                }

                            };

                            setTimeout(function () {
                                ball.toggleFill();
                                if (ball.isFilled) ball.showCount++;
                            }, intervals[currentIntervalIndex]);

                            function clickHandler(event) {
                                if (ball.clickable) {
                                    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
                                    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
                                    if (Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius  && ball.clickable && ball.clickCount < ball.clickLimit) {
                                        ball.clickCount++;
                                        console.log("КЛИК");
                                        ball.clickable = false;
                                        // Изменяем цвет круга на мгновение
                                        ctx.fillStyle = "#026512";
                                        ball.draw();
                                        setTimeout(function () {
                                            ctx.fillStyle = "#0CA725";
                                        }, 100); // Меняем цвет обратно через 100 миллисекунд
                                    }
                                }
                            }
                            //Завершение в pingpong
                            var animationTimer = setTimeout(function () {
                                clearInterval(animationInterval);
                                isEndOfAnimation = true;
                                //Общие действия по концу анимации
                                ctx.clearRect(0, 0, width, height);
                                end_animation_div.classList.remove("input-hidden");
                                result.value = ball.clickCount;
                                console.log("Конец анимации");
                                console.log("Результаты")
                                    console.log("Кол-во показываний = " + ball.showCount);
                                    console.log("Кол-во верных кликов = " + ball.clickCount);
                                    if (ball.showCount == ball.clickCount){
                                        console.log("Харош");
                                    }
                            }, timeOfAnimation); // Установка таймера на всю длительность анимации


                            var animationInterval = setInterval(function () {
                                ctx.clearRect(0, 0, width, height);
                                ball.draw();
                                ball.move();
                            }, 30);

                            break;
                        }
                        case "blink":{
                            //Настройка диапазона прыжка
                            var maxSpeed = 200;
                            var minSpeed = -200;
                            var blink_intervals = 700; //Сколько прыгает (харкодится внизу)
                            var blink_speed = -1;
                            ctx.strokeStyle = "#9682C4"; // Цвет контура
                            ctx.fillStyle = "#0CA725"; // Цвет заливки
                            //Скорость прыжков в зависимости от уровня сложности
                            switch (difficulty_level){
                                case "easy":{
                                    blink_speed = 350;
                                    break;
                                }
                                case "medium":{
                                    blink_speed = 500;
                                    break;
                                }
                                case "hard":{
                                    blink_speed = 650;
                                    break;
                                }
                            }
                            var circle = function (x, y, radius, fillCircle) {
                                ctx.beginPath();
                                ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                                if (fillCircle) {
                                    ctx.fill();
                                } else {
                                    ctx.stroke();
                                }
                            };

                            var Ball = function (maxSpeed, minSpeed, radius, clickLimit) {
                                this.x = width / 2;
                                this.y = height / 2;
                                this.maxSpeed = maxSpeed;
                                this.minSpeed = minSpeed;
                                this.radius = radius;
                                this.isFilled = false;
                                this.clickable = true;
                                this.showCount = 0;
                                this.clickCount = 0; // Счетчик кликов
                                this.clickLimit = clickLimit; // Максимальное количество кликов

                            };
                            Ball.prototype.checkCollision = function(xSpeed, ySpeed){
                                if (this.x - this.radius < 0){
                                        this.x = 0;
                                        this.x += -xSpeed;
                                }
                                if (this.x + this.radius > width){
                                    this.x = width - this.radius;
                                    this.x += -xSpeed;
                                }
                                if (this.y - this.radius < 0){
                                    this.y = this.radius;
                                    this.y += -ySpeed;
                                }
                                if (this.y + this.radius > height){
                                    this.y = height - this.radius;
                                    this.y += -ySpeed;
                                }
                            }

                            Ball.prototype.move = function () {
                                if (this.isFilled) {
                                    xSpeed = 0;
                                    ySpeed = 0;
                                }
                                else {
                                    xSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
                                    ySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
                                }
                                this.x += xSpeed;
                                this.y += ySpeed;
                                this.checkCollision(xSpeed,ySpeed);
                            };

                            Ball.prototype.draw = function () {
                                circle(this.x, this.y, this.radius, this.isFilled);
                            };
                            Ball.prototype.draw_and_move = function (ctx) {
                                ctx.clearRect(0, 0, width, height);
                                this.draw();
                                this.move();
                            }

                            var ball = new Ball(xSpeed, ySpeed, radius, clickLimit);

                            // Функция для смены интервала
                            function changeInterval() {
                                if (!isEndOfAnimation){
                                        currentIntervalIndex++;
                                    if (currentIntervalIndex == 1) {
                                        intervals[0] = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;

                                    }
                                    if (currentIntervalIndex >= intervals.length) {
                                        currentIntervalIndex = 0;
                                    }
                                }
                            }

                            Ball.prototype.toggleFill = function () {
                                if (this.isFilled){
                                    this.isFilled = false;
                                    this.clickable = false;
                                    changeInterval();
                                }
                                else {
                                    if (this.showCount < (this.clickLimit)) {
                                        this.clickable = true;
                                        this.isFilled = true;
                                        changeInterval();
                                    }
                                }


                                if (this.isFilled && this.clickCount < this.clickLimit) {
                                    canvas.addEventListener("click", clickHandler);
                                } else {
                                    canvas.removeEventListener("click", clickHandler);
                                }
                                if (!isEndOfAnimation){
                                    setTimeout(function () {
                                            ball.toggleFill();
                                            if (ball.isFilled && ball.showCount < ball.clickLimit) ball.showCount++;
                                    }, intervals[currentIntervalIndex]);
                                }
                            };

                            setTimeout(function () {
                                if(ball.clickCount < ball.clickLimit){
                                    ball.toggleFill();
                                    if (ball.isFilled) ball.showCount++;
                                }
                            }, intervals[currentIntervalIndex]);

                            function clickHandler(event) {
                                if (ball.clickable) {
                                    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
                                    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
                                    ctx.fillStyle = "#026512";
                                        ball.draw();
                                        setTimeout(function () {
                                            ctx.fillStyle = "#0CA725";
                                        }, 100); // Меняем цвет обратно через 100 миллисекунд

                                    if (Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius  && ball.clickable && ball.clickCount < ball.clickLimit) {
                                        ball.clickCount++;
                                        console.log("КЛИК");
                                        ball.clickable = false;
                                    }
                                }
                            }
                            //Завершение анимации в blink
                            var animationTimer = setTimeout(function () {
                                clearInterval(animationInterval);
                                isEndOfAnimation = true;
                                //Общие действия по концу анимации
                                ctx.clearRect(0, 0, width, height);
                                end_animation_div.classList.remove("input-hidden");
                                result.value = ball.clickCount;
                                console.log("Конец анимации");
                                console.log("Результаты")
                                console.log("Кол-во показываний = " + ball.showCount);
                                console.log("Кол-во верных кликов = " + ball.clickCount);
                                if (ball.showCount == ball.clickCount){
                                    console.log("Харош");
                                }
                            }, timeOfAnimation); // Установка таймера на всю длительность анимации

                            function do_animatic(){
                                ball.draw_and_move(ctx)
                                if (ball.isFilled){
                                    clearInterval(animationInterval);
                                    blink_intervals = 30;
                                    animationInterval = setInterval(do_animatic, blink_intervals);
                                }
                                else {
                                    clearInterval(animationInterval);
                                    blink_intervals = blink_speed;
                                    animationInterval = setInterval(do_animatic, blink_intervals);
                                }
                            }


                            var animationInterval = setInterval(do_animatic, blink_intervals);

                            break;
                        }
                        case "block-fall":{
                            ctx.strokeStyle = "#9682C4"; // Цвет контура
                            ctx.fillStyle = "#0CA725"; // Цвет заливки
                            var numBlocks = 4; // Количество квадратов
                            var directions = ["leftToRight", "rightToLeft", "topToBottom", "bottomToTop"]; // Возможные направления движения
                            // Случайный выбор направления для всех квадратов
                            var randomDirectionIndex = Math.floor(Math.random() * directions.length);
                            var direction = directions[randomDirectionIndex];
                            var blockSizeVertDirection = Math.floor(height / (numBlocks));
                            var blockSizeHorDirection = Math.floor(width / (numBlocks));
                            var clickCount = 0;//Кол-во правильных нажатий
                            var showCount = 0; //Кол-во показываний заполненной фигуры
                            var blocks_speed = -1; //Скорость движения блоков (скорость смены кадров)
                            //Скорость движения меча в зависимости от уровня сложности
                            switch (difficulty_level){
                                case "easy":{
                                    blocks_speed = 30;
                                    break;
                                }
                                case "medium":{
                                    blocks_speed = 15;
                                    break;
                                }
                                case "hard":{
                                    blocks_speed = 10;
                                    break;
                                }
                            }
                            class Block {
                                constructor(x, y, width, height, speed) {
                                    this.x = x;
                                    this.y = y;
                                    this.width = width;
                                    this.height = height;
                                    this.speed = speed;
                                    this.visible = false;
                                    this.isFilled = false; // Флаг для определения, нужно ли заполнять квадрат
                                    this.isClickable = false; // Этим флагом помечается блок, по которому нужно кликать
                                    this.isClicked = false; // Флаг для отслеживания клика
                                }

                                // Метод для отрисовки квадрата
                                draw() {
                                    if (this.visible) {
                                        ctx.lineWidth = 2; // Ширина контура
                                        if (this.isFilled) {

                                            ctx.fillRect(this.x, this.y, this.width, this.height); // Заливаем квадрат цветом
                                        } else {
                                            ctx.strokeRect(this.x, this.y, this.width, this.height); // Рисуем контур квадрата
                                        }
                                    }
                                }

                                // Метод для движения квадрата
                                move() {
                                    if (this.visible) {
                                        if (direction === "leftToRight") {
                                            this.x += this.speed;
                                            if (this.x > width) {
                                                this.visible = false;
                                            }
                                        } else if (direction === "rightToLeft") {
                                            this.x -= this.speed;
                                            if (this.x + this.width < 0) {
                                                this.visible = false;
                                            }
                                        } else if (direction === "topToBottom") {
                                            this.y += this.speed;
                                            if (this.y > height) {
                                                this.visible = false;
                                            }
                                        } else if (direction === "bottomToTop") {
                                            this.y -= this.speed;
                                            if (this.y + this.height < 0) {
                                                this.visible = false;
                                            }
                                        }
                                    }
                                }
                                // Метод для сброса состояния квадрата после клика
                                reset() {
                                    this.isClicked = false;
                                    this.isClickable = false;
                                }
                                // Метод для инициализации квадрата перед его появлением
                                initialize() {
                                    if (direction === "leftToRight") {
                                        this.x = -this.width; // Помещаем квадрат за левую границу холста для движения слева направо
                                        this.y = (blocks.indexOf(this)) * blockSizeVertDirection; // Вычисляем вертикальное положение квадрата
                                    } else if (direction === "rightToLeft") {
                                        this.x = width; // Помещаем квадрат за правую границу холста для движения справа налево
                                        this.y = (blocks.indexOf(this)) * blockSizeVertDirection; // Вычисляем вертикальное положение квадрата
                                    } else if (direction === "topToBottom") {
                                        this.x = (blocks.indexOf(this)) * blockSizeHorDirection; // Вычисляем горизонтальное положение квадрата
                                        this.y = -this.height; // Помещаем квадрат за верхнюю границу холста для движения сверху вниз
                                    } else if (direction === "bottomToTop") {
                                        this.x = (blocks.indexOf(this)) * blockSizeHorDirection; // Вычисляем горизонтальное положение квадрата
                                        this.y = height; // Помещаем квадрат за нижнюю границу холста для движения снизу вверх
                                    }
                                    this.visible = true;
                                }
                            }

                            function is_speed_exist(speed, list){
                                if (list.length == 0) return false;
                                for (let i = 0; i < list.length; i++){
                                   if (speed == list[i]) return true;
                                }
                                return false;
                            }

                            var blocks = []; // Массив для хранения экземпляров квадратов
                            var uniqueSpeed = [];
                            var speedValues = [2, 3, 4, 5];
                            for (let i = 0; i < numBlocks; i++) {
                                speed = speedValues[Math.floor(Math.random() * (speedValues.length))];
                                while(is_speed_exist(speed, uniqueSpeed)){
                                    speed = speedValues[Math.floor(Math.random() * (speedValues.length))];
                                }
                                uniqueSpeed.push(speed);
                            }
                            // Создаем экземпляры квадратов и добавляем их в массив
                            for (let i = 0; i < numBlocks; i++) {
                                if (direction === "leftToRight" || direction === "rightToLeft")
                                    var block = new Block(0, 0, blockSizeVertDirection, blockSizeVertDirection, uniqueSpeed[i]); // Создаем экземпляр квадрата
                                 if (direction === "topToBottom" || direction === "bottomToTop")
                                    var block = new Block(0, 0, blockSizeHorDirection, blockSizeHorDirection, uniqueSpeed[i]); // Создаем экземпляр квадрата

                                blocks.push(block); // Добавляем квадрат в массив
                            }

                            // Инициализируем каждый квадрат перед началом анимации
                            blocks.forEach(function(block) {
                                block.initialize();
                            });
                            // Функция для случайного выбора квадрата для заполнения
                            function fillRandomBlock() {
                                if (showCount < clickLimit) {
                                    ctx.strokeStyle = "#9682C4"; // Цвет контура
                                    ctx.fillStyle = "#0CA725"; // Цвет заливки
                                    showCount++;
                                    var randomIndex = Math.floor(Math.random() * blocks.length);
                                    var randomBlock = blocks[randomIndex];
                                    randomBlock.isFilled = true;
                                    randomBlock.isClickable = true;
                                    canvas.addEventListener("click", clickHandler);
                                    setTimeout(function() {
                                        randomBlock.isFilled = false;
                                        randomBlock.reset();
                                        canvas.removeEventListener("click", clickHandler);
                                        ctx.strokeStyle = "#9682C4"; // Цвет контура
                                        ctx.fillStyle = "#0CA725"; // Цвет заливки
                                        console.log("Кол-во показываний = " + showCount);
                                        console.log("Кол-во верных кликов = " + clickCount);
                                    }, FilledTime);
                                }
                            }
                            function isMouseInsideBlock(block, mouseX, mouseY) {
                                return mouseX >= block.x && mouseX <= (block.x + block.width) &&
                                       mouseY >= block.y && mouseY <= (block.y + block.height);
                            }
                            function clickHandler(event) {
                                blocks.forEach(function(block) { // Для каждого квадрата в массиве
                                    if (block.isClickable) {
                                        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
                                        var mouseY = event.clientY - canvas.getBoundingClientRect().top;
                                        if (isMouseInsideBlock(block,mouseX,mouseY) && !block.isClicked) {
                                            console.log("КЛИК");
                                            block.isClicked = true;
                                            clickCount++;
                                            // Изменяем цвет квадрата на мгновение
                                            ctx.fillStyle = "#026512";
                                            block.draw();
                                            setTimeout(function () {
                                                 ctx.fillStyle = "#0CA725"; // Цвет заливки
                                            }, 200); // Меняем цвет обратно через 100 миллисекунд
                                        }
                                    }
                                });
                            }
                            setInterval(fillRandomBlock, Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec);

                            var animationId; // Переменная для хранения идентификатора анимации
                            function animate() {
                            ctx.clearRect(0, 0, width, height); // Очищаем холст
                            blocks.forEach(function(block) { // Для каждого квадрата в массиве
                                block.draw(); // Отрисовываем квадрат
                                block.move(); // Двигаем квадрат
                                if (!block.visible) {
                                    block.initialize(); // Если квадрат вышел за границы холста, инициализируем его заново
                                }
                            });

                            setTimeout(function() {
                                if (!isEndOfAnimation){
                                    animationId = requestAnimationFrame(animate); // Запрашиваем следующий кадр анимации
                                }
                            }, blocks_speed ); // Рассчитываем интервал в соответствии со скоростью смены кадров

                        }
                            function stopAnimationAfterTime(timeOfAnimation) {
                                setTimeout(function() {
                                    cancelAnimationFrame(animationId); // Остановка анимации
                                    //Общие действия по концу анимации
                                    ctx.clearRect(0, 0, width, height);
                                    end_animation_div.classList.remove("input-hidden");
                                    result.value = clickCount;
                                    console.log("Результаты")
                                    console.log("Кол-во показываний = " + showCount);
                                    console.log("Кол-во верных кликов = " + clickCount);
                                    isEndOfAnimation = true;
                                    if (showCount == clickCount){
                                        console.log("Харош");
                                    }
                                }, timeOfAnimation);
                        }


                            animate(); // Запускаем анимацию
                            stopAnimationAfterTime(timeOfAnimation);//Останавливаем анимацию через timeOfAnimation миллисекунд
                            break;
                        }
                    }
                    break;
                }
                    case "memorization":{
                        //Время демонстрации таблицы
                        var display_time = -1;
                        switch (difficulty_level){
                            case "easy":{
                                display_time = 15000;
                                break;
                            }
                            case "medium":{
                                display_time = 10000;
                                break;
                            }
                            case "hard":{
                                display_time = 5000;
                                break;
                            }
                        }

                        function shuffleArray(array) {
                            for (let i = array.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [array[i], array[j]] = [array[j], array[i]];
                            }
                            return array;
                        }
                        class Shape {
                            constructor(type, color, x=0, y=0, size=0) {
                                this.type = type; // тип фигуры
                                console.log("color =" + color);
                                var colors = {
                                        'red': '#ED2020',
                                        'blue': '#2B4DFC',
                                        'green': '#0CA725',
                                        'yellow': '#F2DC18'
                                    }
                                if (colors[color] != null)
                                {
                                    this.color = colors[color]; // цвет фигуры
                                }
                                else{
                                    this.color = color;
                                }
                                console.log(this.color);
                                this.x = x; // координата x
                                this.y = y; // координата y
                                this.size = size; // размер фигуры
                            }
                            draw(ctx) {
                                // Рисуем фигуру в зависимости от типа
                                ctx.beginPath();
                                switch (this.type) {
                                    case 'квадрат':
                                        ctx.rect(this.x, this.y, this.size, this.size);
                                        break;
                                    case 'круг':
                                        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
                                        break;
                                    case 'треугольник':


                                        ctx.beginPath();
                                        ctx.moveTo(this.x + this.size / 2, this.y); // Вершина
                                        ctx.lineTo(this.x, this.y + this.size); // Левый нижний угол
                                        ctx.lineTo(this.x + this.size, this.y + this.size); // Правый нижний угол
                                        ctx.closePath();
                                        break;
                                    case 'звезда':
                                        const spikes = 5;
                                        const step = Math.PI / spikes;
                                        let rot = Math.PI / 2 * 3;
                                        let x = this.x + this.size / 2;
                                        let y = this.y + this.size / 2;
                                        let outerRadius = this.size / 2;
                                        let innerRadius = outerRadius / 2;
                                        ctx.moveTo(x, y - outerRadius);
                                        for (let i = 0; i < spikes; i++) {
                                            x = this.x + this.size / 2 + Math.cos(rot) * outerRadius;
                                            y = this.y + this.size / 2 + Math.sin(rot) * outerRadius;
                                            ctx.lineTo(x, y);
                                            rot += step;

                                            x = this.x + this.size / 2 + Math.cos(rot) * innerRadius;
                                            y = this.y + this.size / 2 + Math.sin(rot) * innerRadius;
                                            ctx.lineTo(x, y);
                                            rot += step;
                                        }
                                        ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2 - outerRadius);
                                        ctx.closePath();
                                        break;
                                    default:
                                        console.error('Неизвестный тип фигуры:', this.type);
                                        return;
                                }
                                ctx.fillStyle = this.color;
                                ctx.fill();
                            }
                        }

                            class ShapeTable {
                                constructor(canvas, margin, numRows, numCols) {
                                    this.canvas = canvas;
                                    this.ctx = canvas.getContext("2d");
                                    this.shapes = []; // Массив фигур
                                    this.margin = margin;
                                    this.NUM_ROWS = numRows;
                                    this.NUM_COLS = numCols;
                                    this.shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
                                    this.colors = {
                                        'red': '#ED2020',
                                        'blue': '#2B4DFC',
                                        'green': '#0CA725',
                                        'yellow': '#F2DC18'
                                    }
                                    this.adjustCanvasSize();
                                }
                                // Вспомогательная функция для генерации случайного типа фигуры
                                getRandomType() {
                                    return this.shapesType[Math.floor(Math.random() * this.shapesType.length)];
                                }

                                // Вспомогательная функция для генерации случайного цвета
//                                getRandomColor() {
//                                    const keys = Object.keys(this.colors);
//                                    const randomKey = keys[Math.floor(Math.random() * keys.length)];
//                                    const randomElement = this.colors[randomKey]
//                                    return randomElement;
//                                }
                                 getRandomColor() {
                                    const keys = Object.keys(this.colors);
                                    const randomKey = keys[Math.floor(Math.random() * keys.length)];
                                    return randomKey;
                                }

                                // Вспомогательная функция для проверки наличия типа в массиве shapesType
                                isValidType(type) {
                                    return this.shapesType.includes(type);
                                }

                                // Вспомогательная функция для проверки наличия цвета в массиве colors
                                isValidColor(color) {
                                    return Object.keys(this.colors).includes(color);
                                }

                               // Вспомогательная функция для расчета размера ячейки
                                calculateCellSize() {
                                    const cellWidth = (this.canvas.width - this.margin * (this.NUM_COLS + 1)) / this.NUM_COLS;
                                    const cellHeight = (this.canvas.height - this.margin * (this.NUM_ROWS + 1)) / this.NUM_ROWS;
                                    return Math.min(cellWidth, cellHeight);
                                }

                                // Функция для подгонки размера канваса
                                adjustCanvasSize() {
                                    const cellSize = this.calculateCellSize();

                                    const newCanvasWidth = this.NUM_COLS * cellSize + this.margin * (this.NUM_COLS + 1);
                                    const newCanvasHeight = this.NUM_ROWS * cellSize + this.margin * (this.NUM_ROWS + 1);

                                    this.canvas.width = newCanvasWidth;
                                    this.canvas.height = newCanvasHeight;
                                }


                                // Метод для генерации случайных фигур и их расположения в таблице
                                generateShapes() {
                                    const cellSize = this.calculateCellSize();
                                    for (let row = 0; row < this.NUM_ROWS; row++) {
                                        for (let col = 0; col < this.NUM_COLS; col++) {
                                            var x = col * (cellSize + this.margin) + this.margin;
                                            var y = row * (cellSize + this.margin) + this.margin;
                                            this.shapes.push(new Shape(this.getRandomType(), this.getRandomColor(), x, y, cellSize));
                                        }
                                    }
                                }

                                generateShapesByType(type, count) {

                                    var typeIndex = this.shapesType.indexOf(type); // Получаем индекс элемента в массиве
                                    if (typeIndex !== -1) {
                                        // Если элемент найден, извлекаем его из массива и удаляем
                                        this.shapesType.splice(typeIndex, 1);
                                    }
                                    var shapesWithoutCords = [];
                                    for (var i = 0; i < count; i++){
                                        var color = this.getRandomColor()
                                        shapesWithoutCords.push(new Shape(type, color))
                                    }
                                    for (var i = 0; i < (this.NUM_ROWS*this.NUM_COLS)-count; i++){
                                        shapesWithoutCords.push(new Shape(this.getRandomType(), this.getRandomColor()));
                                    }
                                    shapesWithoutCords = shuffleArray(shapesWithoutCords);
                                    var indexOfShape = 0;
                                    var cellSize = this.calculateCellSize();
                                    for (let row = 0; row < this.NUM_ROWS; row++) {
                                        for (let col = 0; col < this.NUM_COLS; col++) {
                                            var x = col * (cellSize + this.margin) + this.margin;
                                            var y = row * (cellSize + this.margin) + this.margin;
                                            this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type,shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                                            indexOfShape++;
                                        }
                                    }
                                }

                            generateShapesByColor(color, count) {

                                var keys = Object.keys(this.colors);
                                var colorIndex = keys.indexOf(color);
                                if (colorIndex !== -1) {
                                    delete this.colors[color]
                                }
                                var shapesWithoutCords = [];
                                for (var i = 0; i < count; i++) {
                                    shapesWithoutCords.push(new Shape(this.getRandomType(), color));
                                }
                                for (var i = 0; i < (this.NUM_ROWS*this.NUM_COLS)-count; i++) {
                                    shapesWithoutCords.push(new Shape(this.getRandomType(), this.getRandomColor()));
                                }
                                shapesWithoutCords = shuffleArray(shapesWithoutCords);
                                var indexOfShape = 0;
                                const cellSize = this.calculateCellSize();
                                for (let row = 0; row < this.NUM_ROWS; row++) {
                                    for (let col = 0; col < this.NUM_COLS; col++) {
                                        var x = col * (cellSize + this.margin) + this.margin;
                                        var y = row * (cellSize + this.margin) + this.margin;

                                        this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type, shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                                        indexOfShape++;
                                    }
                            }
                        }

                            generateShapesByTypeAndColor(type, color, count) {

                                // Проверяем наличие заданного типа и цвета в массивах shapesType и colors
                                if (!this.isValidType(type) || !this.isValidColor(color)) {
                                    console.error('Указанный тип или цвет фигуры не найдены.');
                                    return;
                                }

                                // Удаляем заданный тип из массива shapesType
                                var typeIndex = this.shapesType.indexOf(type);
                                this.shapesType.splice(typeIndex, 1);

                                // Удаляем заданный цвет из словаря colors
                                var keys = Object.keys(this.colors);
                                var colorIndex = keys.indexOf(color);
                                if (colorIndex !== -1) {
                                    delete this.colors[color]
                                }

                                // Генерируем фигуры заданного типа и цвета
                                var shapesWithoutCords = [];
                                for (var i = 0; i < count; i++) {
                                    shapesWithoutCords.push(new Shape(type, color));
                                }

                                // Дополняем оставшиеся ячейки случайными фигурами других типов и цветов
                                for (var i = 0; i < (this.NUM_ROWS * this.NUM_COLS) - count; i++) {
                                    shapesWithoutCords.push(new Shape(this.getRandomType(), this.getRandomColor()));
                                }

                                // Перемешиваем массив фигур
                                shapesWithoutCords = shuffleArray(shapesWithoutCords);

                                // Распределяем фигуры заданного типа и цвета между оставшимися случайными
                                var indexOfShape = 0;
                                var cellSize = this.calculateCellSize();
                                for (let row = 0; row < this.NUM_ROWS; row++) {
                                    for (let col = 0; col < this.NUM_COLS; col++) {
                                        var x = col * (cellSize + this.margin) + this.margin;
                                        var y = row * (cellSize + this.margin) + this.margin;
                                        this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type, shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                                        indexOfShape++;
                                    }
                                }
                            }

                            generateShapesByTypeAndColorAndRow(type, color, count, customRow) {
                                if (count > this.NUM_ROWS) {
                                    console.error('Количество фигур не может быть больше ' + this.NUM_ROWS);
                                    return;
                                }
                                if (customRow > this.NUM_ROWS - 1) {
                                    console.error('Индекс строки не может быть больше ' + (this.NUM_ROWS - 1));
                                    return;
                                }

                                // Проверяем наличие заданного типа и цвета в массивах shapesType и colors
                                if (!this.isValidType(type) || !this.isValidColor(color)) {
                                    console.error('Указанный тип или цвет фигуры не найдены.');
                                    return;
                                }

                                // Генерируем фигуры заданного типа и цвета
                                var shapesWithoutCordsRow = [];
                                for (var i = 0; i < count; i++) {
                                    shapesWithoutCordsRow.push(new Shape(type, color));
                                }
                                var rowCount = shapesWithoutCordsRow.length;
                                if (rowCount < this.NUM_COLS){
                                    for (var i = 0; i < (this.NUM_COLS - rowCount); i++ ){
                                        var randomType = this.getRandomType();
                                        var randomColor = this.getRandomColor();
                                        while (randomType == type && randomColor == color){
                                            randomType = this.getRandomType();
                                            randomColor = this.getRandomColor();
                                        }
                                        shapesWithoutCordsRow.push(new Shape(randomType, randomColor));
                                    }
                                }
                                shapesWithoutCordsRow = shuffleArray(shapesWithoutCordsRow);
                                var cellSize = this.calculateCellSize();
                                console.log(shapesWithoutCordsRow);
                                for (let row = 0; row < this.NUM_ROWS; row++) {
                                    for (let col = 0; col < this.NUM_COLS; col++) {
                                        var x = col * (cellSize + this.margin) + this.margin;
                                        var y = row * (cellSize + this.margin) + this.margin;
                                        if (row != customRow){
                                            this.shapes.push(new Shape(this.getRandomType(), this.getRandomColor(), x, y, cellSize));
                                        }
                                        else{
                                            this.shapes.push(new Shape(shapesWithoutCordsRow[col].type, shapesWithoutCordsRow[col].color, x, y, cellSize));
                                        }
                                    }
                                }
                            }

                            generateShapesByTypeAndColorAndCol(type, color, count, customCol) {
                                if (count > this.NUM_COLS) {
                                    console.error('Количество фигур не может быть больше ' + this.NUM_COLS);
                                    return;
                                }
                                if (customCol > this.NUM_COLS - 1) {
                                    console.error('Индекс столбца не может быть больше ' + (this.NUM_COLS - 1));
                                    return;
                                }

                                // Проверяем наличие заданного типа и цвета в массивах shapesType и colors
                                if (!this.isValidType(type) || !this.isValidColor(color)) {
                                    console.error('Указанный тип или цвет фигуры не найдены.');
                                    return;
                                }

                                // Генерируем фигуры заданного типа и цвета
                                var shapesWithoutCordsCol = [];
                                for (var i = 0; i < count; i++) {
                                    shapesWithoutCordsCol.push(new Shape(type, color));
                                }
                                var colCount = shapesWithoutCordsCol.length;
                                if (colCount < this.NUM_ROWS){
                                    for (var i = 0; i < (this.NUM_ROWS - colCount); i++ ){
                                        var randomType = this.getRandomType();
                                        var randomColor = this.getRandomColor();
                                        while (randomType == type && randomColor == color){
                                            randomType = this.getRandomType();
                                            randomColor = this.getRandomColor();
                                        }
                                        shapesWithoutCordsCol.push(new Shape(randomType, randomColor));
                                    }
                                }
                                shapesWithoutCordsCol = shuffleArray(shapesWithoutCordsCol);
                                console.log(shapesWithoutCordsCol);
                                var cellSize = this.calculateCellSize();
                                for (let col = 0; col < this.NUM_COLS; col++) {
                                    for (let row = 0; row < this.NUM_ROWS; row++) {
                                        var x = col * (cellSize + this.margin) + this.margin;
                                        var y = row * (cellSize + this.margin) + this.margin;
                                        if (col != customCol){
                                            this.shapes.push(new Shape(this.getRandomType(), this.getRandomColor(), x, y, cellSize));
                                        }
                                        else{
                                            this.shapes.push(new Shape(shapesWithoutCordsCol[row].type, shapesWithoutCordsCol[row].color, x, y, cellSize));
                                        }
                                    }
                                }

                            }


                            // Метод для отрисовки таблицы с фигурами
                            draw() {
                                this.shapes.forEach(shape => {
                                    shape.draw(this.ctx);
                                });
                            }
                            }
                            const shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
                            const colors = {
                                'red': '#ED2020',
                                'blue': '#2B4DFC',
                                'green': '#0CA725',
                                'yellow': '#F2DC18'
                            }
                            var margin = 10; // Отступ между фигурами
                            const numRows = 4;
                            const numCols = 6;
                            var shapeTable = new ShapeTable(canvas, margin, numRows, numCols );

                            const taskTextBlock = task.split("-"); // type-color-count-direction-number
                            switch (taskTextBlock.length) {
                                case 2:
                                    if (shapesType.includes(taskTextBlock[0])) {
                                        shapeTable.generateShapesByType(taskTextBlock[0], parseInt(taskTextBlock[1]));
                                    }
                                    if (Object.keys(colors).includes(taskTextBlock[0])) {
                                        shapeTable.generateShapesByColor(taskTextBlock[0], parseInt(taskTextBlock[1]));
                                    }
                                    break;
                                case 3:
                                        shapeTable.generateShapesByTypeAndColor(taskTextBlock[0], taskTextBlock[1], parseInt(taskTextBlock[2]))
                                    break;
                                case 5:
                                    if (taskTextBlock[3] === "row") {
                                        shapeTable.generateShapesByTypeAndColorAndRow(taskTextBlock[0], taskTextBlock[1], parseInt(taskTextBlock[2]), parseInt(taskTextBlock[4]))
                                    }
                                    if (taskTextBlock[3] === "col") {
                                        shapeTable.generateShapesByTypeAndColorAndCol(taskTextBlock[0], taskTextBlock[1], parseInt(taskTextBlock[2]), parseInt(taskTextBlock[4]))
                                    }
                                    break;
                            }

                            shapeTable.draw(); // Отрисовка таблицы с фигурами

                            setTimeout(function() {
                                    console.log("Время для просмотра вышло")
                                    ctx.clearRect(0, 0, width, height);
                                    hidden_task_memory = document.getElementById("hidden_memory_task");
                                    console.log(hidden_task_memory)
                                    task_memorization_text =  document.getElementById("text-task-base-id");
                                    console.log(task_memorization_text)
                                    task_memorization_text.innerText = hidden_task_memory.value;
                                    end_animation_div.classList.remove("input-hidden");
                                }, display_time);
                            break;
                        }
                    }

        });
    }
}