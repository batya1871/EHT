var canvas_memory = document.getElementById("canvas-memory");
if (canvas_memory != null){
    var ctx = canvas_memory.getContext("2d");
    var width = canvas_memory.width;
    var height = canvas_memory.height;
    var display_time = 20000;
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
            this.color = color; // цвет фигуры
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
        constructor(canvas, margin) {
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.shapes = []; // Массив фигур
            this.margin = margin;
            this.NUM_ROWS = 4;
            this.NUM_COLS = 4;
            this.shapesType = ['квадрат', 'круг', 'треугольник', 'звезда'];
            this.colors = ['red', 'blue', 'green', 'yellow'];
        }
        // Вспомогательная функция для генерации случайного типа фигуры
        getRandomType() {
            return this.shapesType[Math.floor(Math.random() * this.shapesType.length)];
        }

        // Вспомогательная функция для генерации случайного цвета
        getRandomColor() {
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        }

        // Вспомогательная функция для проверки наличия типа в массиве shapesType
        isValidType(type) {
            return this.shapesType.includes(type);
        }

        // Вспомогательная функция для проверки наличия цвета в массиве colors
        isValidColor(color) {
            return this.colors.includes(color);
        }

        // Вспомогательная функция для расчета размера ячейки
        calculateCellSize() {
            return (this.canvas.width - this.margin * (this.NUM_COLS + 1)) / this.NUM_COLS;
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
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    var x = col * (cellSize + this.margin) + this.margin;
                    var y = row * (cellSize + this.margin) + this.margin;
                    this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type,shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                    indexOfShape++;
                }
            }
        }

    generateShapesByColor(color, count) {
        var colorIndex = this.colors.indexOf(color);
        if (colorIndex !== -1) {
            this.colors.splice(colorIndex, 1);
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
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
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

        // Удаляем заданный цвет из массива colors
        var colorIndex = this.colors.indexOf(color);
        this.colors.splice(colorIndex, 1);

        // Генерируем фигуры заданного типа и цвета
        var shapesWithoutCords = [];
        for (var i = 0; i < count; i++) {
            shapesWithoutCords.push(new Shape(type, color));
        }

        // Дополняем оставшиеся ячейки случайными фигурами других типов и цветов
        for (var i = 0; i < (4 * 4) - count; i++) {
            shapesWithoutCords.push(new Shape(this.getRandomType(), this.getRandomColor()));
        }

        // Перемешиваем массив фигур
        shapesWithoutCords = shuffleArray(shapesWithoutCords);

        // Распределяем фигуры заданного типа и цвета между оставшимися случайными
        var indexOfShape = 0;
        var cellSize = this.calculateCellSize();
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                var x = col * (cellSize + this.margin) + this.margin;
                var y = row * (cellSize + this.margin) + this.margin;
                this.shapes.push(new Shape(shapesWithoutCords[indexOfShape].type, shapesWithoutCords[indexOfShape].color, x, y, cellSize));
                indexOfShape++;
            }
        }
    }

    generateShapesByTypeAndColorAndRow(type, color, count, customRow) {
        if (count > 4) {
            console.error('Количество фигур не может быть больше 4.');
            return;
        }
        if (customRow > 3) {
            console.error('Индекс строки не может быть больше 3.');
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
        if (rowCount < 4){
            for (var i = 0; i < (4 - rowCount); i++ ){
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
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
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
        if (count > 4) {
            console.error('Количество фигур не может быть больше 4.');
            return;
        }
        if (customCol > 3) {
            console.error('Индекс столбца не может быть больше 3.');
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
        if (colCount < 4){
            for (var i = 0; i < (4 - colCount); i++ ){
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
        var cellSize = this.calculateCellSize();
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
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

    // Пример использования:
    ctx.strokeRect(0, 0, width, height);
    var margin = 10; // Отступ между фигурами
    var shapeTable = new ShapeTable(canvas_memory, margin);
    shapeTable.generateShapesByTypeAndColorAndRow('круг','yellow', 2, 2);
    shapeTable.draw(); // Отрисовка таблицы с фигурами


    setTimeout(function() {
            console.log("Время для просмотра вышло")
            ctx.clearRect(0, 0, width, height);
        }, display_time);
}