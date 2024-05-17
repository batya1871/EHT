var canvas_block_fall = document.getElementById("canvas-block-fall");
if (canvas_block_fall != null){
    var ctx = canvas_block_fall.getContext("2d");
    ctx.strokeStyle = "blue"; // Цвет контура
    ctx.fillStyle = "blue"; // Цвет заливки
    var width = canvas_block_fall.width;
    var height = canvas_block_fall.height;
    var numBlocks = 4; // Количество квадратов
    var directions = ["leftToRight", "rightToLeft", "topToBottom", "bottomToTop"]; // Возможные направления движения
    //Настройка диапазона между нажатиями
    var minSec = 3000;
    var maxSec = 4000;
    var FilledTime = 1500; //Сколько ждет нажатия
    // Случайный выбор направления для всех квадратов
    var randomDirectionIndex = Math.floor(Math.random() * directions.length);
    var direction = directions[randomDirectionIndex];
    var blockSizeVertDirection = Math.floor(width / (numBlocks));
    var blockSizeHorDirection = Math.floor(height / (numBlocks));
    //Отслеживание кол-ва кликов, кол-ва отображений кликабельного объекта и присваивание лимита по кликам
    var clickLimit = 2;
    var clickCount = 0;
    var showCount = 0;
    //Расчет общего времени работы анимации
    //Настройка общего времени анимации
    var timeOfAnimation = (clickLimit*(maxSec + FilledTime) + 500);
    var isEndOfAnimation = false;
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
            ctx.strokeStyle = "blue"; // Цвет контура
            ctx.fillStyle = "blue"; // Цвет заливки
            showCount++;
            var randomIndex = Math.floor(Math.random() * blocks.length);
            var randomBlock = blocks[randomIndex];
            randomBlock.isFilled = true;
            randomBlock.isClickable = true;
            canvas_block_fall.addEventListener("click", clickHandler);
            setTimeout(function() {
                randomBlock.isFilled = false;
                randomBlock.reset();
                canvas_block_fall.removeEventListener("click", clickHandler);
                ctx.strokeStyle = "blue"; // Цвет контура
                ctx.fillStyle = "blue"; // Цвет заливки
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
                var mouseX = event.clientX - canvas_block_fall.getBoundingClientRect().left;
                var mouseY = event.clientY - canvas_block_fall.getBoundingClientRect().top;
                if (isMouseInsideBlock(block,mouseX,mouseY) && !block.isClicked) {
                    console.log("КЛИК");
                    block.isClicked = true;
                    clickCount++;
                    // Изменяем цвет квадрата на мгновение на красный
                    ctx.fillStyle = "red";
                    block.draw();
                    setTimeout(function () {
                         ctx.fillStyle = "blue"; // Цвет заливки
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
        ctx.strokeRect(0, 0, width, height);
    });

    setTimeout(function() {
        if (!isEndOfAnimation){
            animationId = requestAnimationFrame(animate); // Запрашиваем следующий кадр анимации
        }
    }, 15 ); // Рассчитываем интервал в соответствии со скоростью смены кадров 10 20 25

}
    function stopAnimationAfterTime(timeOfAnimation) {
        setTimeout(function() {
            cancelAnimationFrame(animationId); // Остановка анимации
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
}
