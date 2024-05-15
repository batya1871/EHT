var canvas_block_fall = document.getElementById("canvas-block-fall");
if (canvas_block_fall != null){
    var ctx = canvas_block_fall.getContext("2d");
    var width = canvas_block_fall.width;
    var height = canvas_block_fall.height;
    var numBlocks = 4; // Количество квадратов
    var directions = ["leftToRight", "rightToLeft", "topToBottom", "bottomToTop"]; // Возможные направления движения

    // Случайный выбор направления для всех квадратов
    var randomDirectionIndex = Math.floor(Math.random() * directions.length);
    var direction = directions[randomDirectionIndex];

    var blockSizeVertDirection = Math.floor(width / (numBlocks));
    var blockSizeHorDirection = Math.floor(height / (numBlocks));
    class Block {
        constructor(x, y, width, height, speed) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = speed;
            this.visible = false;
        }

        // Метод для отрисовки квадрата
        draw() {
            if (this.visible) {
                ctx.strokeStyle = "blue"; // Цвет контура
                ctx.lineWidth = 2; // Ширина контура
                ctx.strokeRect(this.x, this.y, this.width, this.height); // Рисуем контур квадрата
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
    console.log(uniqueSpeed);
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

    function animate() {
        ctx.clearRect(0, 0, width, height); // Очищаем холст
        blocks.forEach(function(block) { // Для каждого квадрата в массиве
            block.draw(); // Отрисовываем квадрат
            block.move(); // Двигаем квадрат
            if (!block.visible) {
                block.initialize(); // Если квадрат вышел за границы холста, инициализируем его заново
            }
        });
        ctx.strokeRect(0, 0, width, height);
        requestAnimationFrame(animate); // Запрашиваем следующий кадр анимации
    }

    animate(); // Запускаем анимацию
}
